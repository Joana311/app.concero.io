import { handleTransactionError } from '../handlers/handleTransactionError'
import { handleLifiResponse, handleRangoResponse } from './handleResponses'
import { updateLifiSteps } from './updateLifiSteps'
import { GetChainByProviderSymbolI } from '../../../../hooks/DataContext/types'
import { SwitchChainHookType } from '../SwapInput/types'
import { Dispatch } from 'react'
import { executeRangoRoute } from './executeRangoRoute'
import { Route } from '@lifi/types/dist/cjs'
import { standardiseLifiRoute } from '../../../../api/lifi/standardiseLifiRoute'
import { executeLifiRoute } from '../../../../api/lifi/executeLifiRoute'
import { SwapAction, SwapCardStage, SwapState } from '../swapReducer/types'
import { providers } from 'ethers'

interface HandleSwapProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	address: string
	switchChainHook: SwitchChainHookType
	getChainByProviderSymbol: GetChainByProviderSymbolI
	getSigner: () => Promise<providers.JsonRpcSigner>
}

export const handleSwap = async ({ swapState, swapDispatch, address, switchChainHook, getChainByProviderSymbol, getSigner }: HandleSwapProps): Promise<void> => {
	const { from, settings, selectedRoute } = swapState
	const { originalRoute, provider } = selectedRoute

	if (!originalRoute) return console.error('No original route passed')

	swapDispatch({ type: 'SET_LOADING', payload: true })
	swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.progress })

	try {
		if (provider === 'rango') {
			const response = await executeRangoRoute({ route: originalRoute, address, from, settings, swapDispatch, switchChainHook, getChainByProviderSymbol })
			handleRangoResponse(response, swapDispatch, provider)
		} else if (provider === 'lifi') {
			updateLifiSteps({ swapDispatch, selectedRoute })
			const updateRouteHook = (updatedRoute: Route) => {
				const stdRoute = standardiseLifiRoute(updatedRoute)
				updateLifiSteps({ swapDispatch, selectedRoute: stdRoute })
			}

			const signer = await getSigner()
			const acceptExchangeRateUpdateHook = () => Promise.resolve(true)

			const response = await executeLifiRoute(signer, originalRoute, { updateRouteHook, switchChainHook, acceptExchangeRateUpdateHook })
			handleLifiResponse(response, swapDispatch, provider)
		}
	} catch (error: Error) {
		console.log('ERROR: ', error)
		handleTransactionError(error, swapDispatch)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}

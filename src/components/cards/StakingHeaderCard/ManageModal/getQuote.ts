import { Dispatch, MutableRefObject } from 'react'
import { ManageAction, ManageState } from './useManageReducer/types'
import { clearRoute } from './clearRoute'
import { Status, SwapType } from './constants'
import { addingAmountDecimals, addingTokenDecimals, roundNumberByDecimals } from '../../../../utils/formatting'
import { fetchTokenPrice } from '../../../../api/enso/fetchTokenPrice'
import BigNumber from 'bignumber.js'
import { fetchEnsoQuote } from '../../../../api/enso/fetchEnsoQuote'

interface IGetQuote {
	manageState: ManageState
	manageDispatch: Dispatch<ManageAction>
	typingTimeoutRef: MutableRefObject<any>
}

function handleError(error: Error, manageDispatch: Dispatch<ManageAction>): void {
	if (error.message.includes('INSUFFICIENT_GAS_TOKENS')) {
		manageDispatch({ type: 'SET_STATUS', payload: Status.balanceError })
	} else if (error.message.includes('FAILED_DEPENDENCY')) {
		manageDispatch({ type: 'SET_STATUS', payload: Status.noRoute })
	} else {
		manageDispatch({ type: 'SET_STATUS', payload: Status.unknownError })
	}
}

async function handleFetchEnsoQuote(state: ManageState, dispatch: Dispatch<ManageAction>): Promise<void> {
	const route = await fetchEnsoQuote({
		chainId: state.from.chain.id,
		fromAddress: state.address,
		amountIn: addingAmountDecimals(state.from.amount, state.from.token.decimals) as string,
		tokenIn: state.from.token.address,
		tokenOut: state.to.token.address,
	})

	const response = await fetchTokenPrice(state.from.chain.id, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')

	if (!route) return dispatch({ type: 'SET_STATUS', payload: Status.noRoute })
	let gas: null | string = null
	if (route.gas) {
		gas = roundNumberByDecimals(new BigNumber(addingTokenDecimals(route.gas, response.decimals) as string).times(response.price).toString(), 4)
	}

	let toAmountUsd: null | string = null

	if (state.swapType === SwapType.withdraw) {
		const toTokenPrice = await fetchTokenPrice(state.from.chain.id, state.to.token.address)
		toAmountUsd = roundNumberByDecimals(new BigNumber(addingTokenDecimals(route.amountOut, toTokenPrice.decimals) as string).times(toTokenPrice.price).toString(), 4)
	}

	dispatch({ type: 'SET_ROUTE', payload: route, fromAmount: state.from.amount, gas, toAmountUsd })
}

async function fetchQuote(state: ManageState, dispatch: Dispatch<ManageAction>): Promise<void> {
	dispatch({ type: 'SET_LOADING', payload: true })
	dispatch({ type: 'SET_STATUS', payload: Status.loading })
	try {
		await handleFetchEnsoQuote(state, dispatch)
	} catch (error) {
		console.log(error)
		handleError(error as Error, dispatch)
	} finally {
		dispatch({ type: 'SET_LOADING', payload: false })
	}
}

export async function getQuote({ manageState, manageDispatch, typingTimeoutRef }: IGetQuote): Promise<void> {
	if (!manageState.from.amount) return clearRoute(manageDispatch, typingTimeoutRef)
	try {
		if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
		typingTimeoutRef.current = setTimeout(() => fetchQuote(manageState, manageDispatch), 700)
	} catch (error) {
		console.error('[getQuote] ', error)
	}
}

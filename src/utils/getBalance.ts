import { Dispatch } from 'react'
import { fetchTokenBalance } from '../api/rango/fetchTokenBalance'
import { SwapAction } from '../components/cards/SwapCard/swapReducer/types'
import { reverseRangoChainsMap } from '../api/rango/rangoChainsMap'
import { TokenAmount } from './TokenAmount'

interface HandleBalanceProps {
	dispatch: Dispatch<SwapAction>
	from: {
		chain: {
			id: string
			providers: {
				name: string
				symbol: string
			}[]
		}
		token: {
			address: string
			symbol: string
			decimals: number
		}
	}
	address: string | null
}

const handleError = (dispatch: Dispatch<SwapAction>) => {
	dispatch({ type: 'SET_BALANCE', payload: null })
}

export async function getBalance({ dispatch, from, address }: HandleBalanceProps) {
	if (!from || !address) return handleError(dispatch)

	const rangoChainSymbol = reverseRangoChainsMap[String(from.chain.id)]
	if (!rangoChainSymbol) return handleError(dispatch)

	const response = await fetchTokenBalance(rangoChainSymbol, from.token.address, address, from.token.symbol)
	if (!response) return handleError(dispatch)

	dispatch({
		type: 'SET_BALANCE',
		payload: {
			amount: new TokenAmount(response.data, from.token.decimals),
			symbol: from.token.symbol,
		},
	})
}

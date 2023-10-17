import { config } from '../../constants/config'
import { get } from '../client'
import { EnsoRouteResponse, FetchEnsoQuoteParams } from './types'

export async function fetchEnsoRoute({ chainId, fromAddress, amountIn, tokenIn, tokenOut }: FetchEnsoQuoteParams): Promise<EnsoRouteResponse | void> {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${config.ENSO_API_KEY}`,
	}

	const tokenInAddress = tokenIn === config.NULL_ADDRESS ? config.NULL_E_ADDRESS : tokenIn
	const tokenOutAddress = tokenOut === config.NULL_ADDRESS ? config.NULL_E_ADDRESS : tokenOut

	const url = `https://api.enso.finance/api/v1/shortcuts/route?chainId=${chainId}&receiver=${fromAddress}&fromAddress=${fromAddress}&spender=${fromAddress}&amountIn=${amountIn}&tokenIn=${tokenInAddress}&tokenOut=${tokenOutAddress}`
	console.log(url)

	try {
		const response = await get(url, { headers })
		console.log('response', response.data)
		return response.data
	} catch (error) {
		console.error('Error fetching Enso route:', error)
	}
}

export async function fetchEnsoQuote({ chainId, fromAddress, amountIn, tokenIn, tokenOut }: FetchEnsoQuoteParams): Promise<EnsoRouteResponse | void> {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${config.ENSO_API_KEY}`,
	}
	const tokenInAddress = tokenIn === config.NULL_ADDRESS ? config.NULL_E_ADDRESS : tokenIn
	const tokenOutAddress = tokenOut === config.NULL_ADDRESS ? config.NULL_E_ADDRESS : tokenOut

	const url = `https://api.enso.finance/api/v1/shortcuts/quote`

	console.log('fetchEnsoQuote', chainId, fromAddress, amountIn, tokenInAddress, tokenOutAddress)

	const params = {
		chainId,
		fromAddress,
		amountIn,
		tokenIn: tokenInAddress,
		tokenOut: tokenOutAddress,
	}
	try {
		const response = await get(url, params, headers)
		console.log('response', response.data)
		return response.data
	} catch (error) {
		console.error('Error fetching Enso route:', error)
	}
}

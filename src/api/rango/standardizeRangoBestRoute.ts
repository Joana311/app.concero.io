import { StandardRoute, Step } from '../lifi/types'
import { BestRouteResponse } from 'rango-types/src/api/main/routing'
import BigNumber from 'bignumber.js'
import { SwapFee, SwapResult } from 'rango-types/src/api/main/common'
import { roundNumberByDecimals } from '../../utils/formatting'
import { standardizeRangoBestRouteStep } from './standardizeRangoBestRouteStep'

// function standardizeRangoSuperNode(node: SwapSuperNode, index: number): Step {
// 	return {
// 		id: index.toString(),
// 		from: {
// 			token: {
// 				name: node.from,
// 				address: node.fromAddress,
// 				symbol: node.from,
//
// 			},
// 		},
// 	}
// }

function getSteps(route: BestRouteResponse): Step[] | null {
	// const getNode = (node: SwapSuperNode) => node.nodes?.flatMap(standardizeRangoSuperNode) ?? []
	// const getInnerRoute = (innerRoute: SwapRoute) => innerRoute.nodes?.flatMap((node: SwapSuperNode) => node.nodes?.flatMap(getNode) ?? [])

	// const getInternalSwap = (swap: SwapResult) => standardizeRangoBestRouteStep(swap)
	// const getRoute = (route: SwapResult) => route.internalSwaps?.map(getInternalSwap) ?? []

	const steps = route.result?.swaps.map((swap: SwapResult) => standardizeRangoBestRouteStep(swap)) ?? null

	return steps ?? null
}

export async function standardizeRangoBestRoute(route: BestRouteResponse, from: any, to: any): Promise<StandardRoute> {
	console.log(route)

	return {
		id: route.requestId,
		provider: 'rango',
		from: {
			token: {
				name: route.from.symbol,
				address: route.from.address,
				symbol: route.from.symbol,
				decimals: from.token.decimals,
				amount: from.amount,
				amount_usd: from.amount_usd,
			},
			chain: {
				id: route.from.blockchain,
			},
		},
		to: {
			token: {
				name: route.to.symbol,
				address: route.to.address,
				symbol: route.to.symbol,
				decimals: to.token.decimals,
				amount: roundNumberByDecimals(route.result?.outputAmount, 4),
				amount_usd: new BigNumber(route.result?.outputAmount ?? 0).times(route.result?.swaps[route.result.swaps.length - 1]?.to.usdPrice ?? 0).toString(),
			},
			chain: {
				id: route.to.blockchain,
			},
		},
		steps: getSteps(route),
		cost: {
			total_usd: null,
			total_gas_usd: roundNumberByDecimals(
				new BigNumber(
					route.result?.swaps.reduce(
						(res: number, swap: SwapResult): number =>
							(swap.internalSwaps?.reduce(
								(innerSwapRes: number, innerSwap: SwapResult): number =>
									innerSwap.fee.reduce((feeRes: number, feeItem: SwapFee): number => parseFloat(feeItem.amount) + feeRes, 0) + innerSwapRes,
								0,
							) ?? 0) + res,
						0,
					) ?? 0,
				)
					.times(route.result?.swaps[0]?.from.usdPrice ?? 0)
					.toString(),
				2,
			),
		},
		tags: [],
		slippage_percent: null,
		transaction_time_seconds: route.result?.swaps.reduce((result: number, item: SwapResult): number => result + item.estimatedTimeInSeconds, 0) ?? null,
		originalRoute: route,
	}
}

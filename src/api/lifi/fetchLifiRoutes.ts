import { FetchRoutesParams, Route } from './types'
import { standardiseLifiRoute } from './standardiseLifiRoute'
import { addingDecimals } from '../../utils/formatting'
import { lifi } from './lifi'

interface GetRoutes {
  (params: FetchRoutesParams): Promise<Route[]>
}

const sortByTags = (routeA: Route, routeB: Route): number => {
  const tagsOrder = ['RECOMMENDED', 'CHEAPEST', 'FASTEST']
  const tagIndexA = routeA.tags ? tagsOrder.indexOf(routeA.tags[0]) : -1
  const tagIndexB = routeB.tags ? tagsOrder.indexOf(routeB.tags[0]) : -1

  if (tagIndexA === -1 && tagIndexB === -1) return 0
  if (tagIndexA === -1) return 1
  if (tagIndexB === -1) return -1
  if (tagIndexA > tagIndexB) return 1
  return 0
}

export const fetchLifiRoutes = async ({ from, to }: FetchRoutesParams): Promise<GetRoutes> => {
  let result = []
  const routeOptions = {
    fee: 0.002,
    insurance: false,
    integrator: 'concero',
    slippage: 0.01,
  }

  const routesRequest = {
    fromChainId: from.chain.id,
    fromAmount: addingDecimals(Number(from.amount), from.token.decimals),
    fromTokenAddress: from.token.address,
    fromAddress: from.address,
    toChainId: to.chain.id,
    toTokenAddress: to.token.address,
    toAddress: to.address,
    options: routeOptions,
  }

  const response = await lifi.getRoutes(routesRequest)
  if (response.routes.length > 0) {
    result = [...response.routes.map((route) => standardiseLifiRoute(route))]
    result.sort(sortByTags)
  }

  return result
}

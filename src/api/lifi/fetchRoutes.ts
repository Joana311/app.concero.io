import { Chain, ExecutionSettings, LiFi } from '@lifi/sdk'
import { WalletClient } from 'wagmi'
import { Account, Transport } from 'viem'
import { FetchRoutesParams, Route } from './types'
import { standardiseRoute } from './standardiseRoute'
import { lifiTokens } from '../../constants/lifiTokens'
import { addingDecimals } from '../../utils/formatting'

interface GetRoutes {
  routes: Route[]
}

const getTokenDecimalsByAddress = (chainId: number, tokenAddress: string): number =>
  lifiTokens[chainId].find((token) => token.address === tokenAddress).decimals

const sortByTags = (routeA: Route, routeB: Route): number => {
  const tagsOrder = ['RECOMMENDED', 'CHEAPEST', 'FASTEST']
  const tagIndexA = routeA.tags ? tagsOrder.indexOf(routeA.tags[0]) : -1
  const tagIndexB = routeB.tags ? tagsOrder.indexOf(routeB.tags[0]) : -1

  if (tagIndexA === -1 && tagIndexB === -1) {
    return 0
  }
  if (tagIndexA === -1) {
    return 1
  }
  if (tagIndexB === -1) {
    return -1
  }

  if (tagIndexA < tagIndexB) {
  } else if (tagIndexA > tagIndexB) {
    return 1
  } else {
    return 0
  }
}

const lifiConfig = { integrator: 'concero' }
const lifi = new LiFi(lifiConfig)

export const fetchRoutes = async ({ from, to }: FetchRoutesParams): Promise<GetRoutes> => {
  const result = {
    routes: [],
    originalRoutes: [],
  }

  const routesRequest = {
    fromChainId: from.chain.id,
    fromAmount: addingDecimals(Number(from.amount), getTokenDecimalsByAddress(from.chain.id, from.token.address)),
    fromTokenAddress: from.token.address,
    fromAddress: from.address, // todo: hangs if address is provided
    toChainId: to.chain.id,
    toTokenAddress: to.token.address,
    toAddress: to.address,
  }
  // console.log('routesRequest', routesRequest)
  const response = await lifi.getRoutes(routesRequest)
  // console.log('RoutesResponse', response)

  if (response.routes.length > 0) {
    result.routes = [...response.routes.map((route) => standardiseRoute(route))]
    result.originalRoutes = response.routes
    result.routes.sort(sortByTags)
  }
  return result
}

export const executeRoute = async (
  signer: WalletClient<Transport, Chain, Account> | null,
  route: Route,
  settings?: ExecutionSettings,
): Promise<Route> => lifi.executeRoute(signer, route, settings)

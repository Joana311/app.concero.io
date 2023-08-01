import { getTokenBalance } from '@lifi/sdk/dist/balance'
import { numberToFormatString } from '../../../utils/formatting'
import { lifiTokens } from '../../../constants/lifiTokens'

const getTokenBySymbol = (chainId, symbol) => lifiTokens[chainId].find((token) => token.symbol === symbol)

export const getBalance = async (address: string, from, setBalance) => {
  const response = await getTokenBalance(address, getTokenBySymbol(from.chain.id, from.token.symbol))
  if (!response) return
  const result = `${numberToFormatString(Number(response?.amount))} ${response?.symbol}`
  setBalance(result)
}
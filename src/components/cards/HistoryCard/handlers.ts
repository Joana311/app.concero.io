import { fetchPairs } from '../../../api/dexscreener/fetchPairs'
import { fetchTransactionHistory } from '../../../api/dexscreener/fetchTransactionHistory'

const getTokensPair = async (selection) => {
  const { pairs } = await fetchPairs(
    `${selection.historyCard.from.token.symbol}/${selection.historyCard.to.token.symbol}`,
  )
  if (!pairs) throw new Error('No pairs found')

  return pairs
}

const getTransactionHistory = async (tokensPair: string, setHistoryItems: () => void) => {
  const response = await fetchTransactionHistory(tokensPair)
  setHistoryItems(response)
}

export const handleFetchTransactionHistory = async (setIsLoading, setHistoryItems, selection) => {
  setIsLoading(true)
  const tokensPair = await getTokensPair(selection)
  try {
    await getTransactionHistory(tokensPair, setHistoryItems)
    setIsLoading(false)
  } catch (e) {
    setIsLoading(false)
    console.error(e)
  }

  return setInterval(() => getTransactionHistory(tokensPair, setHistoryItems), 10000)
}
import { FC, useState } from 'react'
import classNames from '../SwapCard.module.pcss'
import { Button } from '../../../buttons/Button/Button'
import { EntityListModal } from '../../../modals/EntityListModal/EntityListModal'
import { capitalize } from '../../../../utils/formatting'
import { CryptoSymbol } from '../../../tags/CryptoSymbol/CryptoSymbol'
import { colors } from '../../../../constants/colors'
import { TextInput } from '../../../input/TextInput'
import { chains } from '../../../../constants/chains'
import { tokens } from '../../../../constants/tokens'
import { TokenAreaProps } from './types'
import { chainsColumns } from './chainsColumns'
import { tokensColumns } from './tokensColumns'
import { get } from '../../../../api/clientProxy'

export const TokenArea: FC<TokenAreaProps> = ({ direction, selection, dispatch }) => {
  const [showChainsModal, setShowChainsModal] = useState<boolean>(false)
  const [showTokensModal, setShowTokensModal] = useState<boolean>(false)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)

  const balance = 0

  const setChain = (chain) => {
    dispatch({
      type: 'setChain',
      direction,
      payload: {
        name: chain.name,
        symbol: chain.symbol,
        id: chain.id,
        logoURI: chain.logoURI,
      },
    })
  }

  const setToken = (token) => {
    dispatch({
      type: 'setToken',
      direction,
      payload: {
        name: token.name,
        symbol: token.symbol,
        logoURI: token.logoURI,
      },
    })
  }

  const getCurrentTokenPriceUSD = async (chainId: string, tokenSymbol: string) => {
    const url = `https://li.quest/v1/token?chain=${chainId}&token=${tokenSymbol}`
    const response = await get(url)
    return response.data.priceUSD
  }

  const setFromAmount = (amount) => {
    dispatch({
      type: 'setFromAmount',
      direction,
      payload: amount,
    })

    const fetchPriceUSD = () => {
      let priceUSD = 0
      clearTimeout(typingTimeout)
      setTypingTimeout(
        setTimeout(async () => {
          if (amount) priceUSD = await getCurrentTokenPriceUSD(selection.chain.id, selection.token.symbol)
          dispatch({
            type: 'setFromAmountUSD',
            direction,
            payload: priceUSD * amount,
          })
        }, 1500),
      )
    }

    if (!amount) {
      clearTimeout(typingTimeout)
      dispatch({
        type: 'setFromAmountUSD',
        direction,
        payload: 0,
      })
    }

    fetchPriceUSD()
  }

  return (
    <>
      <div className={classNames.tokenContainer}>
        <div className={classNames.tokenRow}>
          <div className={classNames.tokenRowHeader}>
            <p>{capitalize(direction)}</p>
            <Button
              onClick={() => setShowChainsModal(true)}
              size="sm"
              variant="black"
              rightIcon={{
                name: 'ChevronDown',
                iconProps: {
                  size: 18,
                  color: colors.text.secondary,
                },
              }}
            >
              <CryptoSymbol src={selection.chain.logoURI} symbol={selection.chain.symbol} />
            </Button>
          </div>
          <p>{`Max: ${balance}`}</p>
        </div>
        <div className={classNames.tokenRow}>
          <div>
            <TextInput
              variant="inline"
              placeholder={`0.0 ${selection.token.symbol}`}
              outerValue={selection.amount ? selection.amount.toString() : ''}
              onChangeText={(value) => direction === 'from' && setFromAmount(value)}
              isDisabled={direction === 'to'}
            />
            <h5>
              $
              {selection.amount_usd}
            </h5>
          </div>
          <Button
            onClick={() => setShowTokensModal(true)}
            size="sm"
            variant="black"
            rightIcon={{
              name: 'ChevronDown',
              iconProps: {
                size: 18,
                color: colors.text.secondary,
              },
            }}
          >
            <CryptoSymbol src={selection.token.logoURI} symbol={selection.token.symbol} />
          </Button>
        </div>
      </div>
      <EntityListModal
        title="Select chain"
        data={chains}
        columns={chainsColumns}
        show={showChainsModal}
        setShow={setShowChainsModal}
        onSelect={(chain) => setChain(chain)}
      />
      <EntityListModal
        title="Select token"
        data={tokens[selection.chain.id]}
        columns={tokensColumns}
        show={showTokensModal}
        setShow={setShowTokensModal}
        onSelect={(token) => setToken(token)}
      />
    </>
  )
}

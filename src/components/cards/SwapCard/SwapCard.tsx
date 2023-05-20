import { FC } from 'react'
import { useAccount } from 'wagmi'
import { CardHeader } from '../CardHeader/CardHeader'
import { Button } from '../../buttons/Button/Button'
import classNames from './SwapCard.module.pcss'
import { useSelectionState } from './useSelectionState'
import { TokenArea } from './TokenArea'
import { SwapDetails } from './SwapDetails'

interface SwapCardProps {}

export const SwapCard: FC<SwapCardProps> = () => {
  const { selection, dispatch } = useSelectionState()

  const { isConnected } = useAccount()
  return (
    <div className="card">
      <CardHeader title="Swap" />
      <div className={classNames.swapContainer}>
        <TokenArea direction="from" selection={selection.from} dispatch={dispatch} />
        <TokenArea direction="to" selection={selection.to} dispatch={dispatch} />
        <SwapDetails selection={selection} />
        <Button
          size="lg"
          leftIcon={{ name: 'ArrowsUpDown', iconProps: { size: 18 } }}
          isDisabled={!isConnected}
        >
          {isConnected ? 'Swap' : 'Connect wallet to swap'}
        </Button>
      </div>
    </div>
  )
}

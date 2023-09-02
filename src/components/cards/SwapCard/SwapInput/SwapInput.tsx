import { createWalletClient, custom } from 'viem'
import { providers } from 'ethers'
import { useAccount, useSwitchNetwork } from 'wagmi'
import { FC } from 'react'
import { TokenArea } from '../TokenArea/TokenArea'
import { SwapDetails } from '../SwapDetails/SwapDetails'
import classNames from './SwapInput.module.pcss'
import { SwapInputProps } from './types'
import { SwapButton } from '../../../buttons/SwapButton/SwapButton'
import { handleSwap } from '../swapExecution/handleSwap'

export const SwapInput: FC<SwapInputProps> = ({ swapState, swapDispatch }) => {
  const { address, isConnected } = useAccount()
  const { switchNetwork } = useSwitchNetwork()

  const switchChainHook = (requiredChainId) => {
    if (switchNetwork) switchNetwork(requiredChainId)
    const client0 = createWalletClient({
      transport: custom(window.ethereum),
    })

    const provider = new providers.Web3Provider(client0.transport, 'any')
    return provider.getSigner()
  }

  return (
    <div className={classNames.container}>
      <TokenArea direction="from" selection={swapState.from} swapDispatch={swapDispatch} balance={swapState.balance} />
      <TokenArea direction="to" selection={swapState.to} swapDispatch={swapDispatch} />
      <SwapDetails
        swapState={swapState}
        setSelectedRoute={(route) => swapDispatch({ type: 'SET_SELECTED_ROUTE', payload: route })}
      />
      <SwapButton
        swapState={swapState}
        isConnected={isConnected}
        onClick={() => handleSwap({ swapState, swapDispatch, address, switchChainHook })}
      />
    </div>
  )
}

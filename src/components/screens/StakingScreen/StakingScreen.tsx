import { FC, useEffect } from 'react'
import { approve } from 'wido'
import { useAccount } from 'wagmi'
import { useStakingReducer } from './stakingReducer/stakingReducer'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { DesktopLayout } from './DesktopLayout'
import { MobileLayout } from './MobileLayout'

export const StakingScreen: FC = () => {
  const { address } = useAccount()
  const [stakingState, dispatch] = useStakingReducer()
  const isDesktop = useMediaQuery('mobile') // Adjust this as per your specific media query needs

  useEffect(() => {
    if (address) dispatch({ type: 'SET_ADDRESS', payload: address })
    // getApproveData()
  }, [])

  async function getApproveData() {
    const { data, to } = await approve({
      chainId: 1,
      fromToken: '0x6b175474e89094c44da98b954eedeac495271d0f',
      toToken: '0x6b175474e89094c44da98b954eedeac495271d0f',
      amount: '1000000000000000000',
    })
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {isDesktop ? <DesktopLayout stakingState={stakingState} dispatch={dispatch} /> : <MobileLayout stakingState={stakingState} dispatch={dispatch} />}
    </div>
  )
}

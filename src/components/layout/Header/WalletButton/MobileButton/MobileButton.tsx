import { FC } from 'react'
import { JSX } from 'react/jsx-runtime'
import { useAccount } from 'wagmi'
import { MobileBurgerMenu } from '../../MobileBurgerMenu/MobileBurgerMenu'
import { BaseButton } from '../BaseButton/BaseButton'
import classNames from './MobileButton.module.pcss'
import IntrinsicAttributes = JSX.IntrinsicAttributes

interface MobileButtonProps {
	open: IntrinsicAttributes & ((options?: any) => Promise<void>)
	toggleTheme: () => void
}

export const MobileButton: FC<MobileButtonProps> = ({ open, toggleTheme }) => {
	const { isConnected } = useAccount()

	return (
		<div className={classNames.container}>
			<BaseButton onClick={open} isConnected={isConnected} />
			<MobileBurgerMenu toggleTheme={toggleTheme} />
		</div>
	)
}

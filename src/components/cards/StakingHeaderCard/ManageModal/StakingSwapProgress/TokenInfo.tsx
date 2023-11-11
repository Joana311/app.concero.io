import { FC } from 'react'
import classNames from './StakingSwapProgress.module.pcss'
import { Avatar } from '../../../../tags/Avatar/Avatar'
import { Direction } from '../../../../../types/StandardRoute'

interface TokenInfoProps {
	direction: Direction
}

export const TokenInfo: FC<TokenInfoProps> = ({ direction }) => {
	const { token, chain, amount } = direction
	return (
		<div className={classNames.tokenInfoItem}>
			<Avatar src={token.logoURI} size="sm" />
			<h4>{amount}</h4>
			<h4>{token.symbol}</h4>
			<h4>on</h4>
			<h4>{chain.name}</h4>
		</div>
	)
}
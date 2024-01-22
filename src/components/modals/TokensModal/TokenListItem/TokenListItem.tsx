import classNames from './TokenListItem.module.pcss'
import { type Token } from '../../../../api/concero/types'
import { getChainLogoURIById } from '../../../cards/RouteCard/getChainLogoURIById'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { TokenAmount } from '../../../../utils/TokenAmount'
import { SkeletonLoader } from '../../../layout/SkeletonLoader/SkeletonLoader'
import { TokenIcon } from '../../../layout/TokenIcon/TokenIcon'

interface TokenListItemProps {
	token: Token
	isBalanceLoading: boolean
	onSelect: (token: Token) => void
}

export function TokenListItem({ token, isBalanceLoading, onSelect }: TokenListItemProps) {
	const [chainLogoSrc, setChainLogoSrc] = useState('')
	const { getChains } = useContext(DataContext)

	useEffect(() => {
		getChainLogoURIById(Number(token.chain_id), getChains, setChainLogoSrc)
	}, [])

	return (
		<div
			className={classNames.container}
			onClick={() => {
				onSelect(token)
			}}
		>
			<div className={classNames.tokenInfoContainer}>
				<TokenIcon tokenLogoSrc={token.logoURI} chainLogoSrc={chainLogoSrc} />
				<div className={classNames.tokenTitleContainer}>
					<h4>{token.name}</h4>
					<p className={'body1'}>{token.symbol}</p>
				</div>
			</div>
			<div className={classNames.tokenPriceContainer}>
				{isBalanceLoading ? (
					<SkeletonLoader className={classNames.balanceSkeleton} />
				) : token.balance ? (
					<h4>{new TokenAmount(token.balance, token.decimals).rounded}</h4>
				) : null}
			</div>
		</div>
	)
}
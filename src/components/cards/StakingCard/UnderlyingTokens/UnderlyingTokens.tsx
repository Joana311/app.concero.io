import classNames from './UnderlyingTokens.module.pcss'
import { InputTokens } from '../../../screens/StakingScreen/stakingReducer/types'

interface UnderlyingTokensProps {
	underlyingTokens: InputTokens[]
	isSelected: boolean
}

export function UnderlyingTokens({ underlyingTokens, isSelected }: UnderlyingTokensProps) {
	return (
		<div className={classNames.container}>
			{/* {underlyingTokens.map((token, index) => { */}
			{/* 	if (!token) return null */}
			{/* 	return ( */}
			{/* 		<div key={index} className={`${classNames.tokenContainer}`}> */}
			{/* 			<Avatar src={token.logoURI} size="sm" /> */}
			{/* 			<p className="body1">{token.symbol}</p> */}
			{/* 		</div> */}
			{/* 	) */}
			{/* })} */}
		</div>
	)
}

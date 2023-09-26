import { CryptoSymbol } from '../../../tags/CryptoSymbol/CryptoSymbol'
import { truncate } from '../../../../utils/formatting'
import { colors } from '../../../../constants/colors'

export const TokenColumns = [
	{
		columnTitle: 'Symbol',
		cellComponent: (token: { name: string; symbol: string; logoURI: string }) => <CryptoSymbol src={token.logoURI} />,
	},
	{
		columnTitle: 'Name',
		cellComponent: (token: { name: string; symbol: string }) => <p style={{ color: colors.grey.medium }}>{token.name !== null ? truncate(token.name, 20) : ''}</p>,
	},
]

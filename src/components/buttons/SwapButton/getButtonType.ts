import { type SwapState } from '../../cards/SwapCard/swapReducer/types'
import { ButtonType } from './constants'
import BigNumber from 'bignumber.js'

export function getButtonType(
	swapState: SwapState,
	isConnected: boolean,
	isInsufficientGas: boolean,
	isFetchBalancesLoading: boolean,
): ButtonType {
	const { from, to, routes, isLoading, balance, isNoRoutes, selectedRoute, stage, isTestnet } = swapState

	if (isLoading) {
		return ButtonType.LOADING
	}

	if (isNoRoutes) {
		return ButtonType.NO_ROUTES
	}

	if (!isConnected) {
		return ButtonType.CONNECT_WALLET_BRIGHT
	}

	if (from.amount && isTestnet) {
		if (BigNumber(from.amount).gt(0.1)) return ButtonType.TESTNET_AMOUNT_TOO_HIGH
		return ButtonType.SWAP
	}

	if (!from.amount || (from.amount && routes.length === 0)) {
		return ButtonType.ENTER_AMOUNT
	}

	if (balance && new BigNumber(from.amount).gt(balance.amount.formatted)) {
		return ButtonType.LOW_BALANCE
	}

	if (selectedRoute && stage === 'input') {
		return ButtonType.REVIEW
	}

	if (isFetchBalancesLoading) {
		return ButtonType.FETCH_BALANCES_LOADING
	}

	if (isInsufficientGas) {
		return ButtonType.LOW_GAS
	}

	if (from.amount && to.amount && routes.length > 0) {
		return ButtonType.SWAP
	}

	return ButtonType.ENTER_AMOUNT
}

import { StandardRoute, Step } from '../../../types/StandardRoute'

export interface RouteStepTagProps {
	step: Step
	isRoutesCollapsed: true | false
	length?: number | undefined
	isSelected: true | false
}

export interface RouteCardProps {
	route: StandardRoute
	isSelected: boolean
	onClick: (id: string) => void
}

export interface RouteStep {
	id: string
	transaction_time_seconds: string
	gas_price_usd: string
	slippage_percent: string
}

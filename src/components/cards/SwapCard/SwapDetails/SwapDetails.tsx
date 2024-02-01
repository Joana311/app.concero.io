import { type FC, useEffect, useRef, useState } from 'react'
import classNames from './SwapDetails.module.pcss'
import { RouteButton } from './RouteButton/RouteButton'
import { type SwapDetailsProps } from '../types'
import { action, category } from '../../../../constants/tracking'
import { trackEvent } from '../../../../hooks/useTracking'
import { useTranslation } from 'react-i18next'
import { animated, useSpring } from '@react-spring/web'
import { SelectRouteModal } from './SelectRouteModal/SelectRouteModal'
import { easeQuadInOut } from 'd3-ease'
import { ReviewRouteCard } from './ReviewRouteCard/ReviewRouteCard'

export const SwapDetails: FC<SwapDetailsProps> = ({ swapState, swapDispatch }) => {
	const { t } = useTranslation()
	const { selectedRoute } = swapState
	const [isSelectRouteModalVisible, setIsSelectRouteModalVisible] = useState<boolean>(false)
	const [animatedContainerHeight, setAnimatedContainerHeight] = useState<number>(0)
	const containerRef = useRef<HTMLDivElement>()

	const containerAnimation = useSpring({
		height: selectedRoute ? animatedContainerHeight : 0,
		overflow: 'hidden',
		config: { duration: 200, easing: easeQuadInOut },
	})

	useEffect(() => {
		setAnimatedContainerHeight(containerRef.current?.scrollHeight ?? 0)
	}, [containerRef.current?.scrollHeight])

	return (
		<animated.div style={containerAnimation}>
			<div className={classNames.swapDetailsContainer} ref={containerRef}>
				{swapState.stage === 'input' ? (
					<>
						<p className={'body1'}>{t('swapCard.route')}</p>
						<RouteButton
							selectedRoute={selectedRoute}
							onClick={() => {
								void trackEvent({
									action: action.OpenRoutesModal,
									category: category.SwapCard,
									label: 'route_modal_opened',
								})
								setIsSelectRouteModalVisible(true)
							}}
						/>
						<SelectRouteModal
							swapState={swapState}
							swapDispatch={swapDispatch}
							isOpen={isSelectRouteModalVisible}
							setIsOpen={setIsSelectRouteModalVisible}
						/>
					</>
				) : (
					<ReviewRouteCard swapState={swapState} />
				)}
			</div>
		</animated.div>
	)
}

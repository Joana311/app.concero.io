import { useContext } from 'react'
import { Tag } from '../../tags/Tag/Tag'
import classNames from './RouteCard.module.pcss'
import { Route } from '../../../api/lifi/types'
import { capitalize, numberToFormatString, secondsConverter } from '../../../utils/formatting'
import { Beacon } from '../../layout/Beacon'
import { Button } from '../../buttons/Button/Button'
import { InsuranceContext } from '../SwapCard/InsuranceContext'

export const renderTags = (
  route: Route,
  isSelected: boolean,
  getTextColor: () => string,
  getIconColor: () => string,
) => {
  const advantageTagText = route?.tags[0]?.toLowerCase() === 'recommended' ? 'best' : route?.tags[0]?.toLowerCase()
  const { toggleInsurance } = useContext(InsuranceContext)

  return (
    <div className={classNames.infoTagsContainer}>
      {route?.tags[0]?.length > 0 ? (
        <Tag color={route.tags[0].toLowerCase()}>
          <p style={{ color: 'inherit' }}>{capitalize(advantageTagText)}</p>
        </Tag>
      ) : null}
      {route.insurance ? (
        // <Tag color="green">
        //   <p style={{ color: 'inherit' }}>{route.insurance.state}</p>
        // </Tag>
        <Button variant="black" size="sm" onClick={() => toggleInsurance(route.id)}>
          <p className="body1">Insurance</p>
          <Beacon isOn={route.insurance?.state === 'INSURED'} />
        </Button>
      ) : null}
      <Tag
        color="transparent"
        leftIcon={{
          name: 'Clock',
          iconProps: {
            size: 20,
            color: getIconColor(),
          },
        }}
      >
        <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>
          {secondsConverter(route.transaction_time_seconds)}
        </h5>
      </Tag>
      {route.slippage_percent ? (
        <Tag
          color="transparent"
          leftIcon={{
            name: 'ArrowWaveRightUp',
            iconProps: {
              size: 20,
              color: getIconColor(),
            },
          }}
        >
          <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>
            {numberToFormatString(route.slippage_percent)}%
          </h5>
        </Tag>
      ) : null}
      {route.cost.total_gas_usd ? (
        <Tag
          color="transparent"
          leftIcon={{
            name: 'GasStation',
            iconProps: {
              size: 20,
              color: getIconColor(),
            },
          }}
        >
          <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>${route.cost.total_gas_usd}</h5>
        </Tag>
      ) : null}
    </div>
  )
}

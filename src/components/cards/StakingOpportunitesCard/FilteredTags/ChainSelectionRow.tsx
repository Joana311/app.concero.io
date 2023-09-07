import { FC } from 'react'
import classNames from './FilteredTags.module.pcss'
import { CryptoIcon } from '../../../tags/CryptoSymbol/CryptoIcon'
import Icon from '../../../Icon'
import { colors } from '../../../../constants/colors'

interface ChainSelectionRowProps {
  item: any
  isSelected: boolean
}

export const ChainSelectionRow: FC<ChainSelectionRowProps> = ({ item, isSelected }) => {
  return (
    <div className={classNames.selectItemContainer}>
      <div className={classNames.infoContainer}>
        <CryptoIcon src={item.logoURI} />
        <h5>{item.name}</h5>
        <h5 className={'body1'} style={isSelected ? { color: colors.primary.light } : null}>
          {item.symbol}
        </h5>
      </div>
      <div>{isSelected ? <Icon name="Check" size={16} /> : null}</div>
    </div>
  )
}
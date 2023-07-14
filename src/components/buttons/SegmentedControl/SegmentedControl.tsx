import { FC } from 'react'
import classNames from './SegmentedControl.module.pcss'
import { Button } from '../Button/Button'

interface SegmentedControlProps {
  data: Item[]
  selectedItem: Item
  setSelectedItem: (item: Item) => void
}

interface Item {
  title: string
  value: string
}

export const SegmentedControl: FC<SegmentedControlProps> = ({ data, selectedItem, setSelectedItem }) => {
  return (
    <div className={classNames.container}>
      {data.map((item: Item) => {
        return (
          <Button
            key={item.value}
            variant={'subtle'}
            size={'sm'}
            className={selectedItem.value === item.value ? classNames.selected : ''}
            onClick={() => setSelectedItem(item)}
          >
            <p className={'body1'}>{item.title}</p>
          </Button>
        )
      })}
    </div>
  )
}
import { FC, MouseEvent } from 'react'
import * as Icons from 'tabler-icons-react'
import { IconProps } from 'tabler-icons-react'
import className from './Tag.module.pcss'
import Icon from '../../Icon'

type IconComponentProps = {
  name: keyof typeof Icons
  iconProps?: Omit<IconProps, 'name'>
}

export interface TagProps {
  leftIcon?: IconComponentProps
  rightIcon?: IconComponentProps
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  color: 'red' | 'green' | 'grey' | 'main' | 'mainDarker' | 'recommended' | 'cheapest' | 'fastest' | 'transparent'
  isLoading?: boolean
  children?: string | JSX.Element[] | JSX.Element
  size?: 'sn' | 'md' | 'lg'
}

export const Tag: FC<TagProps> = ({ leftIcon, rightIcon, children, size, color, onClick }) => {
  const sizeClass = size ? className[size] : className.xs

  return (
    <div className={className.container} onClick={onClick ? onClick : null}>
      <div className={`${className.tag}  ${sizeClass} ${className[color]}`}>
        {leftIcon && <Icon name={leftIcon.name} {...leftIcon.iconProps} />}
        {children}
        {rightIcon && <Icon name={rightIcon.name} {...rightIcon.iconProps} />}
      </div>
    </div>
  )
}

export function getSentimentColorByText(text: string): string | null {
  switch (text) {
    case 'bullish':
      return 'green'
    case 'bearish':
      return 'red'
    case 'neutral':
      return 'grey'
    default:
      return 'grey'
  }
}

export function getSentimentIconByText(text: string): IconComponentProps | null {
  switch (text) {
    case 'bullish':
      return {
        name: 'ArrowUpRight',
        iconProps: { size: 18 },
      }
    case 'bearish':
      return {
        name: 'ArrowDownRight',
        iconProps: { size: 18 },
      }
    case 'neutral':
      return {
        name: 'Minus',
        iconProps: { size: 18 },
      }
    default:
      return {
        name: 'Minus',
        iconProps: { size: 18 },
      }
  }
}

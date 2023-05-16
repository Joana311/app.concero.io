import { FC, useState } from 'react'
import Icon from '../Icon'
import * as Icons from 'tabler-icons-react'
import { colors } from '../../constants/colors'
import classNames from './TextInput.module.pcss'

export interface TextInputProps {
  placeholder: string
  value?: string
  onChangeText?: (value: string) => void
  iconName?: keyof typeof Icons
}

export const TextInput: FC<TextInputProps> = ({ placeholder, onChangeText, iconName }) => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    onChangeText && onChangeText(event.target.value)
  }
  return (
    <div className={classNames.inputWrapper}>
      <Icon name={iconName} className={classNames.inputIcon} size={18} color={colors.grey.dark} />
      <input type={'text'} placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  )
}

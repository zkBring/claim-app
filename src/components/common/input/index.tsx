import { FC } from 'react'
import {
  InputContainer,
  InputField,
  InputTitle,
  InputError,
  InputInfo
} from './styled-components'
import { IProps } from './types'

const InputComponent: FC<IProps> = ({
  placeholder,
  title,
  disabled = false,
  type = 'text',
  onChange,
  error,
  name,
  value = '',
  className,
  info,
  refProp
}) => {
  return <InputContainer
    disabled={disabled}
    error={error}
    className={className}
  >
    <InputTitle error={error} active={value.length > 0}>{title}</InputTitle>
    <InputField
      onChange={(evt) => onChange(evt.target.value)}
      type={type}
      error={error}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      ref={refProp}
    />
    {error && <InputError>{error}</InputError>}
    {info && <InputInfo>{info}</InputInfo>}
  </InputContainer>
}

export default InputComponent

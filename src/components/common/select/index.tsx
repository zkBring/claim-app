import React, { FC } from 'react'
import Select from 'react-select'
import { TSelectOption } from 'types'

interface Props {
  options: TSelectOption[],
  value?: TSelectOption,
  placeholder?: string,
  className?: string,
  menuPlacement?: 'bottom' | 'top',
  onChange: (newValue: TSelectOption) => void
}

const SelectComponent: FC<Props> = ({
  options,
  value,
  placeholder,
  className,
  menuPlacement = 'bottom',
  onChange
}) => <Select
    options={options}
    className={className}
    menuPlacement={menuPlacement}
    value={value}
    onChange={(value) => {
      if (!value) { return }
      onChange && onChange(value)
    }}
    placeholder={placeholder}
  />

export default SelectComponent
export interface IInputContainerProps {
  disabled: boolean,
  error?: string,
  className?: string
}

export interface IInputFieldProps {
  value: string,
  error?: string
}

export interface IInputTitleProps {
  active: boolean,
  error?: string
}


export interface IProps {
  title?: string
  placeholder?: string
  type?: string
  name?: string
  disabled?: boolean
  onChange: (value: string) => string
  error?: string
  value: string
  className?: string
  info?: string
  refProp?: React.Ref<HTMLInputElement>
}
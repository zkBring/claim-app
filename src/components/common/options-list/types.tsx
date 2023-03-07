export type TOption = {
  title: string
  icon?: JSX.Element
  onClick: () => void
  recommended?: boolean
}

export type TProps = {
  options: (TOption | undefined)[]
}
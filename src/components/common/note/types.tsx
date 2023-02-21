export type TNoteType = 'default' | 'attention' | 'warning'
export type TNotePosition = 'default' | 'bottom'

export type TProps = {
  text?: string
  className?: string
  type?: TNoteType
  position?: TNotePosition
  onClick?: () => void
}
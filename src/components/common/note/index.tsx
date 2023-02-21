import { FC } from 'react'
import { Note, NoteIcon, NoteText } from './styled-components'
import Icons from 'icons'
import { TNoteType, TProps } from './types'

const defineIcon = (type: TNoteType) => {
  switch (type) {
    case 'attention':
      return <Icons.SecureIcon />
    case 'warning':
      return <Icons.WarningIcon />
    case 'default':
    default:
      return <Icons.ExclamationIcon />
  }
}

const NoteComponent: FC<TProps> = ({
  text,
  className,
  type = 'default',
  position = 'default',
  onClick
}) => {
  return <Note
    onClick={onClick}
    className={className}
    type={type}
    position={position}
  >
    <NoteIcon>
      {defineIcon(type)}
    </NoteIcon>
    <NoteText>
      {text}
    </NoteText>
  </Note>
}

export default NoteComponent
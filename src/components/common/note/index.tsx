import { FC } from 'react'
import { Note, NoteIcon, NoteText } from './styled-components'
import Icons from 'icons'
import { TNoteType } from './types'

type TProps = {
  text: string;
  className?: string;
  type: TNoteType
}

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

const NoteComponent: FC<TProps> = ({ text, className, type }) => {
  return <Note className={className} type={type} >
    <NoteIcon>
      {defineIcon(type)}
    </NoteIcon>
    <NoteText>
      {text}
    </NoteText>
  </Note>
}

export default NoteComponent
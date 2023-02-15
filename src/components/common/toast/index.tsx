import { FC, useEffect, useState } from 'react'
import {
  ToastContainer,
  ToastText,
  ToastIcon
} from './styled-components'
import Icons from 'icons'
import { TProps } from './types'

const Toast: FC<TProps> = ({
  text
}) => {
  const [ created, updateCreated ] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      updateCreated(true)
      setTimeout(() => updateCreated(false), 7000)
    }, 200)
  }, [])

  return <ToastContainer animationStart={created}>
    <ToastIcon>
      <Icons.ExclamationFilledIcon />
    </ToastIcon>
    <ToastText>{text}</ToastText>
  </ToastContainer>
}

export default Toast
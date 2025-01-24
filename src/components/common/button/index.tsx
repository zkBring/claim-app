import { FC } from 'react'
import {
  Anchor,
  ButtonLink,
  ButtonStyled
} from './styled-components'
import { TProps } from './types'

const ButtonComponent: FC<TProps> = (props) => {
  const { href, to, target, size = 'large' } = props
  if (href) {
    return (
      <Anchor href={href} target={target}>
        <ButtonStyled {...props} />
      </Anchor>
    )
  }
  if (to) {
    return (
      <ButtonLink to={to}>
        <ButtonStyled {...props} />
      </ButtonLink>
    )
  }
  return <ButtonStyled {...props} size={size} />
}

export default ButtonComponent

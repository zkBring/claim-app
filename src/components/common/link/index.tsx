import { FC } from 'react'
import { LinkComponent } from './styled-components'
import TProps from './type'

const Link: FC<TProps> = ({ href, target, children }) => {
  return <LinkComponent href={href} target={target}>{children}</LinkComponent>
}

export default Link
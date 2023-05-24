import { FC } from 'react'
import { Image, Title, Subtitle, ButtonStyled } from 'components/pages/common/styles/styled-components'
import ExpiredError from 'images/expired-error.png'

const ErrorComponent: FC = () => {
  return <>
    <Image src={ExpiredError} />
    <Title>Link has expired</Title>
    <Subtitle>This claim is not available anymore</Subtitle>
    <ButtonStyled appearance='default'>Learn more</ButtonStyled>
  </>
}

export default ErrorComponent
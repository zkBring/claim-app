import React, { FC } from 'react'
import { Container, Title, Subtitle } from './styled-components'
import Page from '../page'

type TProps = {
  title: string,
  subtitle: string
}

const CoverPage: FC<TProps> = ({
  title,
  subtitle
}) => {
  return <Page>
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  </Page>
}

export default CoverPage
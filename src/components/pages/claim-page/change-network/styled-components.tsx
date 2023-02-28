import styled from 'styled-components'
import { Button, Text, TokenImage, Title } from 'components/common'

export const TitleComponent = styled(Title)`
  font-size: 22px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0 0 12px;
  max-width: 343px;
`

export const Subtitle = styled.h3`
  font-size: 16px;
  color: ${props => props.theme.primaryTextColor};
  font-weight: 400;
  margin: 0 0 32px;
`

export const ScreenButton = styled(Button)`
  max-width: 100%;
  width: 100%;
  margin-bottom: 16px;
`

export const TextComponent = styled(Text)`
  text-align: center;
  margin-bottom: 32px;
`

export const Container = styled.div`
  text-align: center;
`

export const Image = styled.img`
  max-width: 240px;
  margin-bottom: 24px;
`
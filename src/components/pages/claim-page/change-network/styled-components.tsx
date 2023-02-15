import styled from 'styled-components'
import { Button, Text, TokenImage, Note } from 'components/common'
import Icons from 'icons'

export const Title = styled.h2`
  font-size: 14px;
  color: ${props => props.theme.additionalTextColor};
  font-weight: 400;
  margin: 0 0 4px;
`

export const Subtitle = styled.h3`
  font-size: 24px;
  color: ${props => props.theme.primaryTextColor};
  font-weight: 700;
  margin: 0 0 24px;
  max-width: 343px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Container = styled.div``

export const ScreenButton = styled(Button)`
  max-width: 100%;
  width: 100%;
  margin-bottom: 16px;
`

export const TextComponent = styled(Text)`
  text-align: center;
  cursor: pointer;
`

export const IconComponent = styled(Icons.BlueArrowIcon)`
  vertical-align: middle;
  margin-left: 4px;
`

export const Description = styled.p`
  color: ${props => props.theme.primaryTextColor};
  font-size: 12px;
  margin: 0 0 26px;
`

export const TokenImageContainer = styled(TokenImage)`
  margin-bottom: 24px;
  background: ${props => props.theme.widgetColor};
`

export const NoteStyled = styled(Note)`
  margin-bottom: 24px;
`
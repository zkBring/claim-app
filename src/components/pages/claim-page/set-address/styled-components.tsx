import styled from 'styled-components'
import { Button, Text, TokenImage, Note } from 'components/common'
import Icons from 'icons'
import { Input } from 'linkdrop-ui'

type TScreenButton = {
  title: string,
  onClick: () => void
}

export const Title = styled.h2`
  font-size: 14px;
  color: ${props => props.theme.additionalTextColor};
  font-weight: 500;
  margin: 0 0 4px;
`

export const Subtitle = styled.h3`
  font-size: 24px;
  color: ${props => props.theme.primaryTextColor};
  font-weight: 600;
  margin: 0 0 24px;
  max-width: 343px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Container = styled.div`
  padding: 0 0 20px;
`

export const ScreenButton = styled(Button)<TScreenButton>`
  max-width: 100%;
  width: 100%;
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
  margin: 0 auto 45px;
  background: ${props => props.theme.widgetColor};
  max-width: 343px;
  max-height: 343px;
  object-fit: cover;
  display: block;
  border-radius: 8px;
  width: 40vh;
  height: 40vh;
`

export const NoteStyled = styled(Note)`
  margin-bottom: 24px;
`

export const InputStyled = styled(Input)``

export const Instructions = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 26px;
  color: ${props => props.theme.primaryTextColor};
`

export const Networks = styled.img`
  max-width: 76px;
  margin-right: 16px;
`
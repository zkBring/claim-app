import styled from 'styled-components'
import { Button } from 'components/common'

export const Image = styled.img`
  max-width: 240px;
  margin-bottom: 24px;
`

export const Title = styled.h2`
  margin: 0 0 12px;
  font-size: 24px;
  color: ${props => props.theme.primaryTextColor};
`

export const Subtitle = styled.p`
  color: ${props => props.theme.additionalTextColor};
  font-size: 14px;
  text-align: center;
  margin: 0 0 50px;
`

export const ButtonStyled = styled(Button)`
  margin-bottom: 14px;
  width: 100%;
`

export const AdditionalAction = styled.div`
  color: ${props => props.theme.linkColor};
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`

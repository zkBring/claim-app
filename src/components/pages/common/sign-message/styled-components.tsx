import styled from 'styled-components'
import { Widget, Button } from 'components/common'

export const ContainerWidget = styled(Widget)`
  text-align: center;
`

export const WidgetTitle = styled.h2`
  font-size: 22px;
  line-height: 28px;
  margin: 0 0 12px;
  font-weight: 600;
  text-align: center;
  width: 100%;
  color: ${props => props.theme.primaryTextColor};
`

export const WidgetSubtitle = styled.h3`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  text-align: center;
  width: 100%;
  margin: 0 0 64px;
  color: ${props => props.theme.additionalTextColor};
`

export const ButtonStyled = styled(Button)`
  width: 100%;
`

export const Image = styled.img`
  max-width: 240px;
  margin: 0 0 12px;
`
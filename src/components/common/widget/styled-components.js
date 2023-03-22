import styled from 'styled-components'

export const WidgetContainer = styled.div`
  background: ${props => props.theme.widgetColor};
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
`

export const WidgetBody = styled.div`
  padding: 24px 16px;
`
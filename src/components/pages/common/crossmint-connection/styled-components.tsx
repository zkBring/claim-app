import styled from 'styled-components'
import { Title, Button } from 'components/common'

export const TitleComponent = styled(Title)`
margin: 0 0 12px;
font-weight: 600;
`

export const Subtitle = styled.h3`
  font-size: 14px;
  color: ${props => props.theme.additionalTextColor};
  font-weight: 500;
  margin: 0 0 24px;
`

export const Container = styled.div`
  text-align: center;
  max-width: 343px;
`

export const ButtonStyled = styled(Button)`
  width: 100%;
  margin-bottom: 16px;
`

export const PreviewImage = styled.img`
  max-width: 184px;
  margin-bottom: 36px;
`

export const Note = styled.div`
  font-size: 12px;
  text-align: center;

`
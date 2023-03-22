import styled from 'styled-components'
import { Button } from 'components/common'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 343px;
  margin: 0 auto;
`

export const Image = styled.img`
  max-width: 240px;
  margin-bottom: 24px;
`

export const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  color: ${props => props.theme.primaryTextColor};
`

export const Subtitle = styled.p`
  color: ${props => props.theme.additionalTextColor};
  font-size: 14px;
  margin: 0 0 40px;
  text-align: center;
`

export const ButtonStyled = styled(Button)`
  width: 100%;
`
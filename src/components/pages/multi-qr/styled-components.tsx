import styled from 'styled-components'
import { Button } from 'components/common'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 343px;
  margin: 0 auto;
  justify-content: center;
`

export const IconContainer = styled.div`
  margin-bottom: 35px;
  margin-top: 50px;
`

export const LoadingTitle = styled.h3`
  font-size: 24px;
  line-height: 32px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0 0 12px;
  text-align: center;
`

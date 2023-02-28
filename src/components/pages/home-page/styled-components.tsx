import styled from 'styled-components'
import { Input, Button } from 'components/common'

export const Container = styled.div`
  max-width: 342px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Title = styled.h2`
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  margin: 0 0 12px;
`

export const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 32px;
`

export const InputStyled = styled(Input)`
  margin: 0 0 24px;
  width: 100%;
`

export const ButtonStyled = styled(Button)`
  width: 100%;
`
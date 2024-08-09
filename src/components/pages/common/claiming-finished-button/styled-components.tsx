import styled from 'styled-components'
import { Button, Loader } from 'components/common'

export const ButtonStyled = styled(Button)`
  width: 100%;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0px;
  }
`

export const LoaderStyled = styled(Loader)`
  margin: 0 auto 18px;
`

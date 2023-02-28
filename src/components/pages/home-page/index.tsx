import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container,
  Title,
  Description,
  InputStyled,
  ButtonStyled
}  from './styled-components'
import Page from '../page'
import { IAppDispatch, RootState } from 'data/store'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { connect } from 'react-redux'

const mapStateToProps = ({
  user: { address, provider, chainId, initialized },
  drop: { step, loading }
}: RootState) => ({
  address,
  step,
  provider,
  chainId,
  initialized,
  loading
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getLink: (
        code: string
      ) => dispatch(
        dropAsyncActions.getLinkByCode(
          code 
        )
      )
  }
}

type ReduxType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>

const HomePage: FC<ReduxType> = ({
  getLink,
  loading
}) => {
  const history = useHistory()
  const [ code, setCode ] = useState<string>('')
  const [ link, setLink ] = useState<string>('')
  const [ error, setError ] = useState<string | undefined>(undefined)

  const onClick = async () => {
    const link = await getLink(code)
    console.log({ link })
    if (link && typeof link === 'string') {
      setLink(link)
    } else {
      setError(link.message)
    }
  }
  
  return <Page>
    <Container>
      <Title>Enter the code</Title>
      <Description>Please enter the 8-digit code to continue the claiming process</Description>
      <InputStyled
        value={code}
        error={error}
        placeholder='Code'
        onChange={value => { setCode(value); return value }}
      />
      <ButtonStyled
        appearance='default'
        loading={loading}
        onClick={() => {
          if (link) {
            history.push(link)
          } else {
            onClick()
          }
        }}
      >
        Continue
      </ButtonStyled>
    </Container>  
  </Page>
}

export default connect(mapStateToProps, mapDispatcherToProps)(HomePage)
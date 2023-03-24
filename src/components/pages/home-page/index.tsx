import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container,
  Title,
  Description,
  InputStyled,
  ButtonStyled,
  LinkdropHeader,
  LinkdropHeaderLogo
}  from './styled-components'
import Page from '../page'
import { IAppDispatch, RootState } from 'data/store'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { connect } from 'react-redux'
import LinkdropLogo from 'images/linkdrop-header.png'

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
        code: string,
        callback: (claimCode: string) => void
      ) => dispatch(
        dropAsyncActions.getLinkFromInput(
          code,
          callback
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
  const [ error, setError ] = useState<string | undefined>(undefined)

  const onClick = async () => {
    const link = await getLink(code, (claimCode) => {
      history.push(`/claim/${claimCode}`)
    })
    setError(undefined)
    if (link && typeof link === 'string') {
      history.push(link)
    } else if (link && typeof link !== 'string') {
      setError(link.message)
    } else {
      setError('Some error occured')
    }
  }
  
  return <Page>
    <Container>
      <LinkdropHeader>
        <LinkdropHeaderLogo src={LinkdropLogo} alt="Linkdrop Logo" />
      </LinkdropHeader>
      <Title>Enter the code</Title>
      <Description>Please enter the code to continue the claiming process</Description>
      <InputStyled
        value={code}
        error={error}
        placeholder='Code'
        onChange={value => { setCode(value); return value }}
      />
      <ButtonStyled
        appearance='default'
        loading={loading}
        onClick={onClick}
        disabled={!code || code.length === 0}
      >
        {!loading ? 'Continue' : 'Checking code...'}
      </ButtonStyled>
    </Container>  
  </Page>
}

export default connect(mapStateToProps, mapDispatcherToProps)(HomePage)
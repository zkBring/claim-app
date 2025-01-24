import styled from 'styled-components'

export const Page = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
  background: ${props => props.theme.blankColor};
  color: ${props => props.theme.primaryTextColor};
  overflow-y: scroll;
`

export const MainContent = styled.div`
	flex: 1;
`

export const Content = styled.main`
  padding: 18px 20px 50px;
  overflow: scroll;
  height: 100vh;
`



import styled from 'styled-components'

export const Page = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  background: ${props => props.theme.blankColor};
  overflow-y: scroll;
  padding-bottom: 40px;
`;

export const MainContent = styled.div`
	flex: 1;
`;


export const Content = styled.main`
  padding: 48px 20px 50px;
  overflow: scroll;
  height: 100vh;
`



import styled from 'styled-components'

export const Page = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  background: ${props => props.theme.blankColor};
`;

export const MainContent = styled.div`
	flex: 1;
`;


export const Content = styled.main`
  padding: 78px 20px 50px;
  overflow: scroll;
  height: 100vh;
`



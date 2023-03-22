import styled from 'styled-components'


export const Container = styled.div`
  width: 100vw;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Title = styled.h1`
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0 0 24px;
`

export const Subtitle = styled.h2`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0;
`
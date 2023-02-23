import styled from 'styled-components'

export const OptionsListContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const OptionsListItem = styled.li`
  margin: 0 0 24px;
  padding: 16px;
  border-radius: 8px;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.blankColor};
  min-height: 56px;
  box-shadow: 0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16);
`

export const OptionTag = styled.div`
  border-radius: 8px;
  background-color: ${props => props.theme.buttonDefaultColor};
  padding: 4px 8px;
  line-height: 1;
`
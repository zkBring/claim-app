import styled, { css } from 'styled-components'
import { TNoteType } from './types'

export const Note = styled.div<{type: TNoteType}>`
  background: ${props => props.theme.noteDefaultBgColor};
  color: ${props => props.theme.noteDefaultTextColor};
  padding: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;

  ${props => props.type === 'attention' && css`
    background: ${props => props.theme.noteAttentionBgColor};
    color: ${props => props.theme.noteAttentionTextColor};
  `}

  ${props => props.type === 'warning' && css`
    background: ${props => props.theme.noteWarningTextColor};
    color: ${props => props.theme.primaryTextColor};
  `}
`

export const NoteIcon = styled.div`
  margin-right: 14px;
`

export const NoteText = styled.p`
  margin: 0;
`
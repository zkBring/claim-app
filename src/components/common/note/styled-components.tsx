import styled, { css } from 'styled-components'
import {  TProps } from './types'

export const Note = styled.div<TProps>`
  background: ${props => props.theme.noteDefaultBgColor};
  color: ${props => props.theme.noteDefaultTextColor};
  padding: 16px;
  border-radius: 8px;
  display: flex;
  font-size: 14px;
  align-items: center;

  ${props => props.type === 'attention' && css`
    background: ${props => props.theme.noteAttentionBgColor};
    color: ${props => props.theme.noteAttentionTextColor};
  `}

  ${props => props.position === 'bottom' && css`
    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 0;
    width: 100%;
  `}

  ${props => props.onClick && css`
    cursor: pointer;
    user-select: none;
  `}
`

export const NoteIcon = styled.div`
  margin-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NoteText = styled.p`
  margin: 0;
`
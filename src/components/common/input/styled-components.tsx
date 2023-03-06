import styled, { css } from 'styled-components'
import { IInputContainerProps, IInputFieldProps, IInputTitleProps } from './types'

export const InputContainer = styled.div.attrs(props => ({
  className: props.className
}))<IInputContainerProps>`
  margin-bottom: 24px;
`

export const InputTitle = styled.h3<IInputTitleProps>`
  margin-bottom: 4px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  margin-top: 0px;
  color: ${props => props.theme.primaryTextColor};

  ${props => props.active && css`
    color: ${props =>  props.theme.primaryHighlightColor}; 
  `}

  ${props => props.error && css`
    color: ${props =>  props.theme.dangerTextColor}; 
  `}
`

export const InputField = styled.input<IInputFieldProps>`
  color: ${props => props.theme.primaryTextColor};
  font-size: 14px;
  width: 100%;
  line-height: 1;
  padding: 13px;
  border: 1px solid;
  border-color: ${props => props.theme.inputBorderColor};
  border-radius: 8px;
  background-color: ${props => props.theme.inputBgColor};
  transition: border-color .3s;
  outline: none;

  &:focus {
    ${props => !props.error && css`
      border-color: ${props => props.theme.inputBorderHoverColor};
      outline: none;
    `}
  }

  ${props => props.value && props.value.length > 0 && css`
    border-color: ${props => props.theme.inputBorderHoverColor};
  `}

  ${props => props.error && css`
    border-color: ${props =>  props.theme.tagErrorColor}; 
  `}

  &::placeholder {
    color: ${props => props.theme.inputPlaceholderColor};
  }
`

export const InputError = styled.div`
  margin-top: 6px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: ${props => props.theme.dangerTextColor};
`

export const InputInfo = styled.div`
  margin-top: 6px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: ${props => props.theme.noteTextColor};
`
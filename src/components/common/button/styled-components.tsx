import styled, { css } from 'styled-components';
import Loader from '../loader'

interface ButtonProps {
  disabled: boolean,
  loading: boolean,
  size: 'small' | 'default',
  appearance: 'inverted' | 'default',
  className?: string
}

export const ButtonLoader = styled(Loader)`
  margin-right: 8px;
`

export const Button = styled.button.attrs(props => ({
  className: props.className
}))<ButtonProps>`
  background-color: ${props => props.theme.buttonDefaultColor};
  color: ${props => props.theme.secondaryTextColor};
  font-size: 16px;
  cursor: pointer;
  padding: 15px 16px;
  display: flex;
  max-height: 52px;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 16px;
  transition: opacity .3s;
  border: 2px solid ${props => props.theme.buttonDefaultColor};

  ${props => props.size && props.size === 'small' && css`
    font-size: 12px;
    padding: 4px 8px;
    border-width: 1px;
  `}

  ${props => props.appearance === 'inverted' && css`
    background-color: transparent;
    border-color: ${props.theme.buttonBorderColor};
    color: ${props.theme.primaryTextColor};
  `}

  ${props => !props.disabled && props.appearance === 'inverted' && css`
    &:hover, &:active {
      opacity: 0.3;
    }
  `}

  ${props => props.disabled && css`
    cursor: not-allowed;
  `}

  ${props => props.disabled && props.appearance === 'inverted' && css`
    background-color: transparent;
    border-color: ${props.theme.buttonDisabledColor};
    color: ${props.theme.buttonDisabledTextColor};
  `}

  ${props => props.disabled && props.appearance === 'default' && css`
    background-color: ${props.theme.buttonDisabledColor};
    border-color: ${props.theme.buttonDisabledColor};
    color: ${props.theme.buttonDisabledTextColor};
  `}


  ${props => !props.disabled && props.appearance === 'default' && css`
    &:hover, &:active {
      opacity: 0.3;
    }
  `}

  ${props => props.disabled && css`
    cursor: not-allowed;
    opacity: 0.6;
  `}
`;

export const Link = styled.a`
  text-decoration: none;
  display: inline-block;
  min-height: 52px;
`

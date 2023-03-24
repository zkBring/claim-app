import styled, { css } from 'styled-components';
import ButtonLoader from '../button-loader'

interface ButtonProps {
  disabled: boolean,
  loading: boolean,
  size: 'small' | 'default',
  appearance: 'inverted' | 'default',
  className?: string
}

export const ButtonLoaderStyled = styled(ButtonLoader)`
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
  max-height: 56px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 16px;
  transition: opacity .3s;
  border: 1px solid ${props => props.theme.buttonDefaultColor};

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
    &:hover {
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
    &:hover {
      opacity: 0.3;
    }
  `}

  ${props => props.disabled && css`
    cursor: not-allowed;
  `}

  ${props => props.loading && css`
    background: ${props => props.theme.buttonGradient};
    background-size: 200%;
    background-position: left top;
    transition: background-position .3s, transform .3s;
    border-color: transparent;
    color: ${props => props.theme.secondaryTextColor};

    ${!props.disabled && css`
      &:hover {
        background-position: right top;
      }
      &:active {
        background-position: center center;
        transform: scale(1.01);
      }
    `}
  `}
`;

export const Link = styled.a`
  text-decoration: none;
  display: inline-block;
  min-height: 52px;
`

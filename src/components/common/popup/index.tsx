import { FC } from 'react'
import {
  PopupContent,
  PopupContainer,
  PopupHeader,
  LinkdropHeaderLogo,
  CloseButton,
  PopupTitle,
  PopupButtons,
  ButtonStyled,
  PopupBody
} from './styled-components'
import TProps from './types'
import LinkdropLogo from 'images/linkdrop-header.png'
import PopupClose from 'images/popup-close.png'

const Popup: FC<TProps> = ({
  title,
  className,
  onCloseAction,
  mainAction,
  children,
  mainActionTitle = 'Ok, I understand'
}) => {
  return <PopupContainer className={className}>
    <PopupBody>
      <PopupHeader>
        <LinkdropHeaderLogo src={LinkdropLogo} alt="Linkdrop" />
        <CloseButton
          src={PopupClose}
          alt="close button"
          onClick={onCloseAction}
        />
      </PopupHeader>
      <PopupContent>
        <PopupTitle>{title}</PopupTitle>
        {children}
      </PopupContent>
      {mainAction && <PopupButtons>
        <ButtonStyled
          onClick={mainAction}
        >
          {mainActionTitle}
        </ButtonStyled>
      </PopupButtons>}
      
    </PopupBody>
    
  </PopupContainer>
}

export default Popup
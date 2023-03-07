import { FC } from 'react'
import {
  OptionsListContainer,
  OptionsListItem,
  OptionTag,
  OptionImage
} from './styled-components'
import { TOption, TProps } from './types'

const OptionsList: FC<TProps> = ({
  options
}) => {
  return <OptionsListContainer>
    {options.map((option: TOption | undefined) => {
      if (!option) { return null }
      const {
        title,
        icon,
        onClick,
        recommended
      } = option
      return <OptionsListItem onClick={onClick}>
        {icon && <OptionImage>{icon}</OptionImage>}
        {title}
        {recommended && <OptionTag>Recommended</OptionTag>}
      </OptionsListItem>
    })}
  </OptionsListContainer>
}

export default OptionsList
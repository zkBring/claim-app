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
        recommended,
        tag
      } = option
      return <OptionsListItem onClick={onClick}>
        {icon && <OptionImage>{icon}</OptionImage>}
        {title}
        {recommended && !tag && <OptionTag>Recommended</OptionTag>}
        {tag && <OptionTag>{tag}</OptionTag>}
      </OptionsListItem>
    })}
  </OptionsListContainer>
}

export default OptionsList
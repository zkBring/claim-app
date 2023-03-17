import { FC } from 'react'
import {
  OptionsListContainer,
  OptionsListItem,
  OptionTag,
  OptionImage,
  OptionsListItemLink
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
        tag,
        href
      } = option
      if (href) {
        return <OptionsListItemLink href={href}>
          {icon && <OptionImage>{icon}</OptionImage>}
          {title}
          {recommended && !tag && <OptionTag>Recommended</OptionTag>}
          {tag && <OptionTag>{tag}</OptionTag>}
        </OptionsListItemLink>
      }
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
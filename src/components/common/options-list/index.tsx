import { FC } from 'react'
import { OptionsListContainer, OptionsListItem, OptionTag } from './styled-components'
import { TOption, TProps } from './types'

const OptionsList: FC<TProps> = ({
  options
}) => {
  return <OptionsListContainer>
    {options.map(({
      title,
      icon,
      onClick,
      recommended
    }: TOption) => <OptionsListItem onClick={onClick}>
      {icon}
      {title}
      {recommended && <OptionTag>Recommended</OptionTag>}
    </OptionsListItem>)}
  </OptionsListContainer>
}

export default OptionsList
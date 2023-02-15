import React, { FC } from 'react'
import {
    Button,
    ButtonLoader,
    Link
} from './styled-components'

interface Props {
  title?: string,
  disabled?: boolean,
  loading?: boolean,
  size?: 'small' | 'default',
  onClick?: () => void,
  appearance?: 'inverted' | 'default',
  className?: string,
  href?: string,
  target?: '_blank' |'_self' |'_parent' | '_top'
}

const ButtonComponent: FC<Props> = ({
  size = 'default',
  title,
  disabled = false,
  loading = false,
  onClick,
  appearance = 'default',
  className,
  href,
  target,
  children
}) => {
  const button = <Button
    size={size}
    disabled={disabled}
    loading={loading}
    onClick={onClick}
    appearance={appearance}
    className={className}
  >
    {loading && <ButtonLoader size='small' />}{title || children}
  </Button>
  if (href) {
    return <Link href={href} target={target} className={className}>
      {button}
    </Link>
  }
  return button
}


export default ButtonComponent
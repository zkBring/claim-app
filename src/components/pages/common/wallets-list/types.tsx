import { TDropStep, TMultiscanStep } from 'types'

type TProps = {
  setStep: (step: TDropStep & TMultiscanStep) => void
  enableENS?: boolean
}

export default TProps

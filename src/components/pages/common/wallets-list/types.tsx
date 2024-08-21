import { TDropStep, TMultiscanStep } from 'types'

type TProps = {
  setStep: (step: TDropStep & TMultiscanStep) => void
}

export default TProps

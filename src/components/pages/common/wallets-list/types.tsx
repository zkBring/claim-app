import { TDropStep, TMultiscanStep } from 'types'

type TProps = {
  setStep: (step: TDropStep & TMultiscanStep) => void
  enableENS?: boolean
  enableZerion?: boolean
}

export default TProps

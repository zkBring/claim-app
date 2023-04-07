export type TStatus = 'initial' | 'finished'

type TProps = {
  image: string
  amount: string
  decimals: number
  name: string
  status?: TStatus
}

export default TProps
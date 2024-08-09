export interface PageProps {
  account?: string,
  chainId?: number | null,
  children: React.ReactNode,
  noHeader?: boolean
}

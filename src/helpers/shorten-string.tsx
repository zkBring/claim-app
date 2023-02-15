const shortenString = (string: string | undefined, symbolsToShow: number = 5) => {
  if (!string) return '...'
  return `${string.slice(0, symbolsToShow)}...${string.slice(-symbolsToShow)}`
}

export default shortenString
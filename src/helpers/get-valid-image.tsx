import { IPFSRedefineUrl } from 'helpers'
import tokenPlaceholder from 'images/token-placeholder.png'

const getValidImage = async (imageUrl: string) => {
  if (!imageUrl) {
    return tokenPlaceholder
  }
  try {
    const redefinedURL = IPFSRedefineUrl(imageUrl)
    const checkImage = await fetch(redefinedURL)
    if (checkImage.status === 404) { throw new Error() }
    return redefinedURL
  } catch (err) {
    
    return tokenPlaceholder
  }
}
export default getValidImage
import jwt from "jsonwebtoken"
const { sign } = jwt

export default {
  createToken ( expireTime: string, key: string,  ...props: any ) {
     const token = sign(
        { ...props }, key, {
        expiresIn: expireTime
    }
    )
    return token 
  },
  createPairAuthToken (infos : Record<string, any>) {
      const accessToken = this.createToken('15m' , JWT_REFRESH_TOKEN_KEY as string, infos)
       const refreshToken = this.createToken('7d' , JWT_REFRESH_TOKEN_KEY as string, infos)                                    
      return { accessToken , refreshTokne }
  }
}

const deleteDecodedKey = (object: Record<string, any>) => {
  if (!object.decoded) return
  delete object.decoded
}

export default deleteDecodedKey
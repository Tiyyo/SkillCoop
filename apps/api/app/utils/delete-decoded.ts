const deleteDecodedKey = (
  object: Record<string, string | number | boolean>,
) => {
  if (!object.decoded) return;
  delete object.decoded;
};

export default deleteDecodedKey;

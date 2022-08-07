import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: Object,
 // keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const privateKey = config.get<string>("accessTokenPrivateKey");
  // const signingKey = Buffer.from(
  //   config.get<string>(keyName),
  //   "base64"
  // ).toString("ascii");

  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) {
  // const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
  //   "ascii"
  // );
  const publicKey = config.get<string>("accessTokenPublicKey");

  console.log({token});

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}

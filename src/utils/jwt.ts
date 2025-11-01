import jwt, { SignOptions, JwtPayload, Secret } from "jsonwebtoken";

const SECRET_KEY: Secret = process.env.JWT_SECRET || "supersecretkey123";
const DEFAULT_EXPIRES_IN = "7d" as unknown as SignOptions["expiresIn"];

export const signToken = (payload: object, expiresIn = DEFAULT_EXPIRES_IN): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET_KEY, options);
};

export const verifyToken = (token: string): string | JwtPayload | null => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
};

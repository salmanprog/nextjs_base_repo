import { prisma } from "@/lib/prisma";
import { signToken } from "@/utils/jwt";

export async function createUserToken(
  userId: number,
  deviceType?: string,
  ip?: string,
  userAgent?: string
) {
  const token = await signToken({ id: Number(userId) });
  await prisma.userApiToken.deleteMany({
    where: { userId },
  });
  const savedToken = await prisma.userApiToken.create({
    data: {
      userId,
      api_token: token,
      device_type: deviceType || "web",
      ip_address: ip,
      user_agent: userAgent,
    },
  });
  return savedToken;
}

export async function getUserByToken(token: string) {
  return prisma.userApiToken.findFirst({
    where: { api_token: token },
    include: { user: true },
  });
}

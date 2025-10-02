import jwt from "jsonwebtoken";

export const getToken = (candidate) => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) throw new Error("JWT_SECRET is not defined!");
  
  return jwt.sign(
    {
      email: candidate.email,
      username: candidate.username,
      id: candidate.id,
      createdAt: candidate.createdAt,
      isBanned: candidate.isBanned,
      isMuted: candidate.isMuted,
      isAdmin: candidate.isAdmin,
    },
    secret,
  );
};
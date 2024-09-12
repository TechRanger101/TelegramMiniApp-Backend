// src/utils/generateToken.ts  

import jwt from 'jsonwebtoken';  

const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Keep your secret key safe and use environment variables  

export const generateToken = (userId: number) => {  
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '30d' }); // Expires in 12 hour  
  return token;
};
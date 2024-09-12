import { randomBytes } from 'crypto';  

export const  generateSecureRandomString = ()=> {  
  // Use crypto.randomBytes to generate a random buffer
  const randomBuffer = randomBytes(7);  
  
  // Use buffer's base64 encoding and remove '+', '/' and '=' to ensure it is alphanumeric  
  // Take the required length to ensure the string isn't longer than requested 
  const randomString = 'LAT ' + randomBuffer.toString('base64').replace(/\+/g, '0').replace(/\//g, '0').replace(/=+$/, '').substr(0, 7);  
  return randomString;  
}  

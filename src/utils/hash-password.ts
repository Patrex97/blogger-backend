import * as crypto from 'crypto';

export const hashPassword = (password: string): string => {
  const saltString =
    'vnbasvcoavbefosc 982n3f-fbascaun3br93r!@#!@1nv9-subv0=83brnalpwnvsdvljbf91brOAF';
  const hmacHash = crypto.createHmac('sha512', saltString);
  hmacHash.update(password);
  return hmacHash.digest('hex');
};

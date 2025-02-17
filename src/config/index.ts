import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  node_env: process.env.NODE_ENV || 'development',
  admin_email: process.env.ADMIN_EMAIL,
  admin_pass: process.env.ADMIN_PASS,
  app_pass: process.env.APP_PASS,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  bcrypt_salt: parseInt(process.env.BCRYPT_SALT as string) || 10,
  access_token_expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_expires: process.env.REFRESH_TOKEN_EXPIRES_IN,
};

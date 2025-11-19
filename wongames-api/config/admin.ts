import dotenv from 'dotenv';
dotenv.config();

export default ({ env }) => {
  const secret = env('ADMIN_JWT_SECRET') || process.env.ADMIN_JWT_SECRET;
  
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET not found in environment variables');
  }

  return {
    auth: {
      secret,
    },
    apiToken: {
      salt: env('API_TOKEN_SALT'),
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT'),
      },
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
  };
};
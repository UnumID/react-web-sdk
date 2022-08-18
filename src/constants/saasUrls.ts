import { SaasEnvironment } from '../types';

export const saasUrls: Record<SaasEnvironment, string> = {
  local: 'http://localhost:6030',
  development: 'https://api.dev-unumid.co',
  sandbox: 'https://api.sandbox-unumid.co',
  production: 'https://api.unumid.co',
};

export const walletUrls: Record<SaasEnvironment, string> = {
  local: 'http://localhost:3000',
  development: 'https://wallet.dev-unumid.co',
  sandbox: 'https://wallet.sandbox-unumid.co',
  production: 'https://wallet.unumid.co',
};

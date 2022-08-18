import { SaasEnvironment } from '../types';

export const saasUrls: Record<SaasEnvironment, string> = {
  local: 'http://localhost:6030',
  development: 'https://api.dev-unum.id',
  sandbox: 'https://api.sandbox-unum.id',
  production: 'https://api.unum.id',
};


export const walletUrls: Record<SaasEnvironment, string> = {
  local: 'http://localhost:3000',
  development: 'https://wallet.dev-unum.id',
  sandbox: 'https://wallet.sandbox-unum.id',
  production: 'https://wallet.unum.id',
};

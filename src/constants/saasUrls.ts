import { SaasEnvironment } from '../types';

export const saasUrls: Record<SaasEnvironment, string> = {
  development: 'https://api.dev-unum.id',
  sandbox: 'https://api.sandbox-unum.id',
  production: 'https://api.unum.id',
};

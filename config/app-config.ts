import packageJson from '../package.json';

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: 'GoFindMe',
  version: packageJson.version,
  copyright: `© ${currentYear}, gofindme.`,
  meta: {
    title: 'GoFindMe - Easy Location Services API for Developers',
    description:
      'GoFindMe provides developers with a simple, powerful API to add location tracking and location services to their applications. Get started in minutes with our developer-friendly location API.',
  },
};

export const adminRedirectPath = '/admin/';
export const loginRedirectPath = '/dashboard/';
export const logoutRedirectPath = '/';

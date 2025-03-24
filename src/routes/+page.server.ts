import { CLIENT_ID } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    CLIENT_ID
  };
};

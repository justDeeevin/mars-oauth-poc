import type { PageServerLoad } from './$types.js';
import { error } from '@sveltejs/kit';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';

type TokenRes = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

type DiscordUser = {
  id: string;
  username: string;
  discriminator: string;
};

type DiscordGuild = {
  id: string;
  name: string;
  icon: string;
  banner: string;
  owner: boolean;
  permissions: string;
  features: string[];
  approximate_member_count: number;
  approximate_presence_count: number;
};

const API_URL = 'https://discord.com/api/v10';

export const load: PageServerLoad = async ({ url }) => {
  const code = url.searchParams.get('code');
  if (!code) error(400, 'No code provided');
  const state = url.searchParams.get('state');
  if (!state) error(400, 'No state provided');

  let res = await fetch(`${API_URL}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
    },
    body: new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:5173/code'
    })
  });

  const data: TokenRes = await res.json();
  const token = data.access_token;
  const headers = { Authorization: `Bearer ${token}` };
  res = await fetch(`${API_URL}/users/@me`, { headers });
  if (res.status != 200) error(500, 'Failed to get user');
  let user = (await res.json()) as DiscordUser;

  res = await fetch(`${API_URL}/users/@me/guilds`, { headers });
  if (res.status != 200) error(500, 'Failed to get guilds');
  let guilds = (await res.json()) as DiscordGuild[];
  let players = await Bun.file('players.json').json();
  players[state] = user.id;
  Bun.write('players.json', JSON.stringify(players));

  return { user, guilds, state };
};

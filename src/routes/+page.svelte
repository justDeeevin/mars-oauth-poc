<script lang="ts">
  import { page } from '$app/state';
  import type { PageProps } from './$types';
  let state = $state('');
  let { data }: PageProps = $props();
</script>

<input type="text" bind:value={state} />
<br />
<a
  href={`https://discord.com/oauth2/authorize?client_id=${data.CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(page.url.href + 'code')}&scope=identify+guilds&state=${state}`}
  >authorize</a
>

<script lang="ts">
  import type { PageProps } from './$types.ts';
  const { data }: PageProps = $props();
  const in_server = data.guilds.some((g) => g.id === '271369861416878081');
</script>

<h1>Authorized for {data.user.username}</h1>
<p>User is <strong>{in_server ? '' : 'not'}in server</strong></p>
<p>State: {data.state}</p>

<a href="/">back</a>

<script lang="ts">
  let state = $state('');
</script>

<input type="text" bind:value={state} />
<br />
<a
  href={`https://discord.com/oauth2/authorize?client_id=1351761987754917938&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fcode&scope=identify+guilds&state=${state}`}
  >authorize</a
>

<script>
  import Sidebar from "./Sidebar.svelte";
  import Action from "./Action.svelte";

  import { user } from "../../utils/stores/user";
  import { onMount } from "svelte";
  import { getMe } from "../../utils/helpers/me";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { token } from "../../utils/stores/token";

  const fetchMe = async () => {
    const response = await fetch(`${$tempConfig.server_URL}${$tempConfig.me}`, {
      headers: {
        "Authorization": `token ${$token}`,
      },
    });
    const data = await response.json();
    $user = data[0];
    console.log(`FETCH ME ==>> ${JSON.stringify(data, null, 2)}`)
    return data[0];
  };

  // $: console.log($user);
  // $: console.log($token);
</script>

<style>

</style>

{#await fetchMe()}
  <h4>Loading</h4>
{:then data}
  <div class="bg-white flex h-screen w-screen">
    <div class="bg-dark-500 w-64">
      <Sidebar user={data}/>
    </div>
    <div class="w-full max-h-screen-md overflow-y-scroll">
      <Action user={data}/>
    </div>
  </div>
{:catch error}
  {error}
{/await}

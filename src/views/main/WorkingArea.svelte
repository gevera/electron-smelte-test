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
  .back {
    background-color: #e5e5e5;
  }
</style>

{#await fetchMe()}
  <h4>Loading</h4>
{:then data}
  <div class="h-screen w-screen bg-white flex">
    <div class="flex-1 back">
      <Sidebar user={data}/>
    </div>
    <Action user={data}/>
  </div>
{:catch error}
  {error}
{/await}

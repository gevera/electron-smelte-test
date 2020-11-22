<script>
  import "smelte/src/tailwind.css";
  import Canvas from "./components/common/Canvas.svelte";
  import SimpleLogin from "./components/login_register/SimpleLogin.svelte";
  import NewPassword from "./components/login_register/NewPassword.svelte";
  import Register from "./components/login_register/Register.svelte";
  import WorkingArea from "./views/main/WorkingArea.svelte";
  import { user } from "./utils/stores/user";
  import { onMount } from "svelte";
  import { getRegions, getCities } from "./utils/helpers/region";
  import { viewStates } from "./utils/stores/viewStates";

  onMount(async () => {
    await getRegions();
    await getCities();
  });
</script>

<Canvas>
  {#if $viewStates == 'register'}
    <Register />
  {:else if $viewStates == 'active'}
    <WorkingArea />
  {:else if $viewStates == 'login'}
    <SimpleLogin />
  {/if}
</Canvas>

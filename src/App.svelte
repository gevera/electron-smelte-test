<script>
  import "smelte/src/tailwind.css";
  import Canvas from "./components/common/Canvas.svelte";
  import SimpleLogin from "./components/login_register/SimpleLogin.svelte";
  import Register from "./components/login_register/Register.svelte";
  import NewPassword from "./components/login_register/NewPassword.svelte";
  import WorkingArea from "./views/main/WorkingArea.svelte";
  import { user } from "./utils/stores/user";
  import { onMount } from "svelte";
  import { getRegions } from "./utils/helpers/region";

  onMount(async () => {
    getRegions();
  });
</script>

<Canvas>
  {#if Object.keys($user).length === 0 && $user.constructor === Object}
    <SimpleLogin />
  {:else if $user}
    <WorkingArea />
  {/if}
</Canvas>

<script>
  // TODO
  
  // 3. В сайдбаре после редиректа активный элемент не меняется (не так важно, но в финале нужно будет)
  // BI 5. Элемент Уведомления нужно сделать (откуда брать и как работать с API подскажу, в Figma я оставил комментарий) 
  // 7. Accept Review from RP -> Prinyeati/Okloniti
  // BI 8. Get RP in EditAccount of Contractor
  // BI 10. Fix Photo Upload and Download

  import "smelte/src/tailwind.css";
  import Canvas from "./components/common/Canvas.svelte";
  import SimpleLogin from "./components/login_register/SimpleLogin.svelte";
  import NewPassword from "./components/login_register/NewPassword.svelte";
  import Register from "./components/login_register/Register.svelte";
  import WorkingArea from "./views/main/WorkingArea.svelte";
  import { token } from "./utils/stores/token";
  import { user } from "./utils/stores/user";
  import { onMount } from "svelte";
  import { getRegions, getCities } from "./utils/helpers/region";
  import { viewStates } from "./utils/stores/viewStates";
  import { getMe } from "./utils/helpers/me";

  const token_localstorage = localStorage.getItem("token");
  const update_password = localStorage.getItem("update_password");

  onMount(async () => {
    console.log($user);
    console.log(token_localstorage);
    console.log(update_password);
    await getRegions();
    await getCities();
    if (Object.keys($user).length === 0) {
      await getMe(token_localstorage);
    }
    if (update_password == true) {
      $viewStates = "change password";
    }
    if (token_localstorage && !update_password) {
      $viewStates = "active";
    }
  });
</script>

<Canvas>
  {#if $viewStates == 'register'}
    <Register />
  {:else if $viewStates == 'active'}
    <WorkingArea />
  {:else if $viewStates == 'change password'}
    <NewPassword />
  {:else if $viewStates == 'login'}
    <SimpleLogin />
  {/if}
</Canvas>

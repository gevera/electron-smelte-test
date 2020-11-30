<script>
  // TODO
  
  // 1. Нужно будет валидацию на фронте добавить, required, email
  // 2. Вывод ошибок валидации (хотя бы под формой) и что сервер отвечает, если ошибка (где это возможно реализовать)
  // 3. Маски для input (phone, email)
  // 4. Кнопку выхода (у меня в программе есть)
  // 5. В сайдбаре после редиректа активный элемент не меняется (не так важно, но в финале нужно будет)
  // 6. Удаление картинки, кнопка всплывает при наведении / Add delete icon/button on hover when photo is added
  // 7. Элемент Уведомления нужно сделать (откуда брать и как работать с API подскажу, в Figma я оставил комментарий)
  // 8. Convert everything to forms with prevent default
  // 9. Decline/Accept Review from RP -> Prinyeati/Okloniti
  // 10. Get RP in EditAccount of Contractor
  // 11. Fix Tables
  // 12. Fix Photo Upload and Download
  // 13. Fix height and dimensions of app
  // 15. add maximize button electron

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

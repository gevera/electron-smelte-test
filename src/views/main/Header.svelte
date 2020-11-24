<script>
  import { Button, Chip } from "smelte";
  // import { user } from "../../utils/stores/user";
  import { regions } from "../../utils/stores/regions";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { viewStates } from "../../utils/stores/viewStates";
  import { onMount } from "svelte";

  export let user;

  onMount(() => console.log("HEADER MOUNTED!"));

  const openAccountSettings = () => {
    if (user.user.groups == 2 || user.user.groups == 3) {
      $activeHeader = "Настройка аккаунта";
    } else if (user.user.groups == 4) {
      $activeHeader = "Редактирование аккаунта";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("update_password");
    $viewStates = "login";
  };

  $: region = $regions.filter((r) => r.id == user.user.region)[0].name;
  $: group = user.user.groups;

  $: console.log(` HEADER DATA ==>> ${JSON.stringify(user, null, 2)}`);
</script>

<div class="flex items-center justify-between w-full p-2">
  <div class="border-l-4 border-primary-500 pl-4">
    <h5 class="text-dark-500">{$activeHeader}</h5>
  </div>
  <div class="flex justify-end">
    <Button text flat color="dark" icon="notifications" />
    <Button
      text
      flat
      color="dark"
      icon="settings"
      on:click={openAccountSettings} />
    <div class="border-l-2 pl-4 flex items-center">
      <div class="mr-2">
        <h6 class="text-drk-500 font-light mb-1">
          {user.first_name}
          {user.last_name}
        </h6>
        <p class="text-sm text-dark-500 flex">
          {#if group == 3 && user.balance}
            <span>Баланс: {user.balance} руб.</span>
          {:else}{region}{/if}
        </p>
      </div>
      <img
        class="rounded-full border-2 border-primary-500 h-16 w-16 cursor-pointer"
        src="./images/avatar.jpeg"
        alt="avatar"
        on:dblclick={logout} />
    </div>
  </div>
</div>

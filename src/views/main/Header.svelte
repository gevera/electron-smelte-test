<script>
  import { Button } from "smelte";
  import { regions } from "../../utils/stores/regions";
  import { activeHeader } from "../../utils/stores/activeHeader";


  export let user;

  let newNotification = false;

  const openAccountSettings = () => {
    if (user.user.groups == 2 || user.user.groups == 3) {
      $activeHeader = "Настройка аккаунта";
    } else if (user.user.groups == 4) {
      $activeHeader = "Редактирование аккаунта";
    }
  };

  $: region = $regions.filter((r) => r.id == user.user.region)[0].name;
  $: group = user.user.groups;

  // $: console.log(` HEADER DATA ==>> ${JSON.stringify(user, null, 2)}`);
</script>

<div class="flex items-center justify-between w-full p-2">
  <div class="border-l-4 border-primary-500 pl-4">
    <h5 class="text-dark-500">{$activeHeader}</h5>
  </div>
  <div class="flex justify-end">
    <Button text flat color={newNotification ? "primary" : "dark"} icon={newNotification ? "notifications_active" : "notifications"} class={newNotification ? 'animate-ping' : ''}/>
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
        on:dblclick={() => newNotification = !newNotification}
        class="rounded-full border-2 border-primary-500 h-16 w-16"
        src={user.user.face_photo}
        alt="avatar"/>
    </div>
  </div>
</div>

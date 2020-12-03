<script>
  import { Button, Menu } from "smelte";
  import { regions } from "../../utils/stores/regions";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { token } from "../../utils/stores/token";
  import { fetchNotification } from "../../utils/helpers/fetchers";
  import { notification } from "../../utils/stores/notification";
  import { onMount } from "svelte";
import { getName } from "../../utils/helpers/transformers";

let open = false,
	  selected = "";

  const items_ = [
		{ value: 1, text: 'One' },
		{ value: 2, text: 'Two' },
		{ value: 3, text: 'Three' },
		{ value: 4, text: 'Four' },
		{ value: 5, text: 'Five' },
	];

  onMount(async () => {
    await fetchNotification($token);
  });

  $: console.log($notification);
  $: items = $notification.map(n => ({value: n.id, text: n.description}))

  export let user;

  let newNotification = false;

  $: if($notification.length > 0 && $notification.some(n => n.status == 2)) {
    newNotification = true;
  }

  const openAccountSettings = () => {
    if (user.user.groups == 2 || user.user.groups == 3) {
      $activeHeader = "Настройка аккаунта";
    } else if (user.user.groups == 4) {
      $activeHeader = "Редактирование аккаунта";
    }
  };

  $: group = user.user.groups;

  // $: console.log(` HEADER DATA ==>> ${JSON.stringify(user, null, 2)}`);
</script>

<div class="flex items-center justify-between w-full p-2">
  <div class="border-l-4 border-primary-500 pl-4">
    <h5 class="text-dark-500">{$activeHeader}</h5>
  </div>
  <div class="flex justify-end">
    <Menu bind:open {items} bind:value={selected}>
      <div slot="activator">
        <Button
        on:click={() => open = !open}
        text
        flat
        color={newNotification ? 'primary' : 'dark'}
        icon={newNotification ? 'notifications_active' : 'notifications'}
        class={newNotification ? 'animate-pulse' : ''} />
      </div>
      <slot>Hahahahah</slot>
    </Menu>
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
          {:else}{ getName($regions, user.user.region)}{/if}
        </p>
      </div>
      <img
        on:dblclick={() => (newNotification = !newNotification)}
        class="rounded-full border-2 border-primary-500 h-16 w-16"
        src={user.user.face_photo}
        alt="avatar" />
    </div>
  </div>
</div>

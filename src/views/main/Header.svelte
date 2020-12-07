<script>
  import { Button, Dialog, List } from "smelte";
  import { regions } from "../../utils/stores/regions";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { token } from "../../utils/stores/token";
  import { orderID } from "../../utils/stores/order";
  import { fetchNotification } from "../../utils/helpers/fetchers";
  import { notification } from "../../utils/stores/notification";
  import { onMount } from "svelte";
  import { getName } from "../../utils/helpers/transformers";

  let open = false,
    showNotifications = false,
    newNotification = false,
    selected = "";

  let items = [
    // { value: 1, text: "One" },
    // { value: 2, text: "Two" },
    // { value: 3, text: "Three" },
    // { value: 4, text: "Four" },
    // { value: 5, text: "Five" },
  ];

  onMount(async () => {
    await fetchNotification($token);
  });

  $: console.log($notification);
  $: items = $notification.map((n) => ({
    value: n.id,
    text: n.description,
    ...n,
  }));

  export let user;

  $: if ($notification.length > 0 && $notification.some((n) => n.status == 2)) {
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

  const toggleNotification = () => {
    if (newNotification) {
      showNotifications = !showNotifications;
    }
  };

  const getStatusName = (s) => {
    if (s == 2) {
      return "Отклонен";
    } else if (s == 1) {
      return "В работе";
    }
  };

  const orderDetails = (id) => {
    console.log(id);
    $orderID = id;
    $activeHeader = 'Просмотр заявки';
    showNotifications = false;

  }

  // $: console.log(` HEADER DATA ==>> ${JSON.stringify(user, null, 2)}`);
  $: console.log();
</script>

<div class="relative flex items-center justify-between w-full p-2">
  <div class="border-l-4 border-primary-500 pl-4">
    <h5 class="text-dark-500">{$activeHeader}</h5>
  </div>
  <div class="flex justify-end">
    <Button
      on:click={toggleNotification}
      text
      flat
      color={newNotification ? 'primary' : 'dark'}
      icon={newNotification ? 'notifications_active' : 'notifications'}
      class={newNotification ? 'animate-pulse' : ''}>
      <div />
    </Button>

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
          {:else}{getName($regions, user.user.region)}{/if}
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
<Dialog bind:value={showNotifications}>
  <h5 slot="title" class="text-dark-500 text-base">Уведомления</h5>
  <div class="">
    <ul class="list-none flex flex-wrap max-w-screen-sm">
      {#each $notification as item}
        <li class="w-1/2 px-4">
          <div class="py-2 px-4 my-2 border-b hover:bg-gray-100">
            <div class="flex flex-col mb-2">
              <span class="">Ваш отчет №{item.order}</span>
              <span class="text-sm text-dark-300">{item.description}</span>
            </div>
            <div class="flex justify-between">
              {#if item.status == 2}
              <p class='text-sm bg-primary-500 text-white px-2'>{getStatusName(item.status)}</p> 
              {:else if item.status == 1}
              <p class='text-sm bg-secondary-500 text-white px-2'>{getStatusName(item.status)}</p>
              {:else}
              <p class='text-sm'>{getStatusName(item.status)}</p>
              {/if}
              <p class="text-sm text-secondary-500 cursor-pointer" on:click={orderDetails(item.order)}>Подробнее</p>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
  <div slot="actions">
    <Button text on:click={() => (showNotifications = false)}>Закрыть</Button>
  </div>
</Dialog>

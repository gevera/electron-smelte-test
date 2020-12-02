<script>
  import { Select, Dialog, Button } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { cities } from "../../utils/stores/regions";
  import { token } from "../../utils/stores/token";
  import { user } from "../../utils/stores/user";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { orderID, showDialogAgreement } from "../../utils/stores/order";
  import Submenu from "../../components/common/Submenu.svelte";

  // TODO If no data show icon and info

  let dataFetched = [];
  let city = "";
  let loading = false;

  async function getData() {
    if (typeof window === "undefined") return;
    loading = true;
    const res = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.orderList}`,
      {
        headers: {
          Authorization: `token ${$token}`,
        },
      }
    );
    if (res.ok) {
      const body = await res.json();
      dataFetched = body;
      console.log(dataFetched);
      loading = false;
    }
  }

  getData();

  $: data = dataFetched
    .map((d) => ({
      ...d,
      city: [...$cities].filter((c) => c.id == d.city)[0].name,
    }))
    .filter((o) => o.status == 1);

  $: itemsCity = [...$cities].map((r) => ({ value: r.id, text: r.name }));

  let itemsData = [
    {
      value: 1,
      text: "Просмотр",
      action: (id) => {
        $activeHeader = "Просмотр заявки";
        $orderID = id;
      },
    },
    {
      value: 2,
      text: "Взять заявку",
      action: (id) => {
        $showDialogAgreement = true;
        $orderID = id;
      },
    },
  ];

  const takeOrder = async () => {
    $showDialogAgreement = false;
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.orderExecute}${$orderID}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${$token}`,
        },
      }
      );
      if (response.ok) {
        // getData();
        $activeHeader = "Заявки в работе";
    }
  };
</script>

<div class="py-6">
  <!-- <div class="flex px-6 items-center">
    <p class="text-dark-500 mr-2">Город</p>
    <Select
      bind:value={city}
      outlined
      autocomplete
      label="Город"
      items={itemsCity} />
  </div> -->
  <ul>
    {#each data as item, i (item.id)}
      <li
        class="cursor-pointer p-2 flex hover:bg-primary-200 items-center list-none"
        class:bg-gray-100={i % 2}>
        <div class="w-3/12 border-r pl-6 text-dark-500">{item.customer}</div>
        <div class="w-3/12 border-r pl-4 text-dark-500">
          {item.customer_number}
        </div>
        <div class="w-5/12 border-r pl-4 text-dark-500">
          г.
          {item.city}
          {item.customer_address}
        </div>
        <div class="w-1/12 px-2 flex justify-start">
          <Submenu id={item.id} {itemsData} />
        </div>
      </li>
    {/each}
  </ul>
</div>

<Dialog bind:value={$showDialogAgreement}>
  <h5 slot="title">Вы согласны принять данную заявку?</h5>
  <div slot="actions">
    <Button text color="dark" on:click={() => ($showDialogAgreement = false)}>Нет</Button>
    <Button on:click={takeOrder}>Да я согласен</Button>
  </div>
</Dialog>

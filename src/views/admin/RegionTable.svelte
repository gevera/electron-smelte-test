<script>
  import { Dialog, Button } from "smelte";
  import Submenu from "../../components/common/Submenu.svelte";
  import Loading from "../../components/common/Loading.svelte";
  import NoData from "../../components/common/NoData.svelte";
  import { fetchAllRegions } from "../../utils/helpers/fetchers";
  import { orderID, showDialogAgreement } from "../../utils/stores/order";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { token } from "../../utils/stores/token";

  // $: itemsCity = [...$cities].map((r) => ({ value: r.id, text: r.name }));

  let itemsData = [
    {
      value: 1,
      text: "Просмотр",
      action: (id) => {
        $activeHeader = "Просмотр региона";
        $orderID = id;
      },
    },
    {
      value: 2,
      text: "Редактирование",
      action: (id) => {
        $activeHeader = "Редактирование региона";
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
      $activeHeader = "Заявки в работе";
    }
  };
</script>

<div class="py-6">
  {#await fetchAllRegions($token)}
    <Loading />
  {:then data}
    <ul>
      {#each data as item, i (item.id)}
        <li
          class="cursor-pointer p-2 flex justify-between hover:bg-primary-200 items-center list-none"
          class:bg-gray-100={i % 2}>
          <div class="pl-6 text-dark-500">{item.name}</div>
          <div class="w-1/12 border-l px-2 flex justify-start">
            <Submenu id={item.id} {itemsData} />
          </div>
        </li>
      {/each}
    </ul>
  {:catch}
    <NoData />
  {/await}
</div>

<Dialog bind:value={$showDialogAgreement}>
  <h5 slot="title">Вы согласны принять данную заявку?</h5>
  <div slot="actions">
    <Button text color="dark" on:click={() => ($showDialogAgreement = false)}>
      Нет
    </Button>
    <Button on:click={takeOrder}>Да я согласен</Button>
  </div>
</Dialog>

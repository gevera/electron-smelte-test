<script>
  import Submenu from "../../components/common/Submenu.svelte";
  import Loading from "../../components/common/Loading.svelte";
  import NoData from "../../components/common/NoData.svelte";
  import { getName } from "../../utils/helpers/transformers";
  import { fetchAllRPs } from "../../utils/helpers/fetchers";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { orderID } from "../../utils/stores/order";
  import { regions } from "../../utils/stores/regions";
  import { token } from "../../utils/stores/token";
  
  // TODO Cannot block RP
  export let itemsData = [
    {
      value: 1,
      text: "Просмотр",
      action: (id) => {
        $activeHeader = "Региональный представитель";
        $orderID = id;
      },
    },
    // {
    //   value: 2,
    //   text: "Редактирование",
    //   action: (id) => {
    //     $activeHeader = "Редактирование заявки";
    //     $orderID = id;
    //   },
    // },
  ];
</script>

<div class="py-6">
  {#await fetchAllRPs($token)}
    <Loading />
  {:then data}
    <!-- <div class="px-6 flex items-center mb-4">
    <p class="mr-4 text-dark-500">Исполненные</p>
    <div class="pt-1">
      <Switch />
    </div>
  </div> -->
    <ul>
      {#each data.filter(r => r.status == 1) as rp, i (rp.user.pk)}
        <li
          class="cursor-pointer p-2 flex hover:bg-primary-200 items-center list-none"
          class:bg-gray-100={i % 2}>
          <div class="w-3/12 border-r pl-6 text-dark-500">
            {rp.first_name}
            {rp.last_name}
          </div>
          <div class="w-2/12 border-r pl-4 text-dark-500">{rp.user.phone}</div>
          <div class="w-5/12 border-r pl-4 text-dark-500">
            {getName($regions, rp.user.region)}
          </div>
          <div class="w-2/12 px-2 flex justify-start">
            <Submenu id={rp.user.pk} {itemsData} />
          </div>
        </li>
      {/each}
    </ul>
    <div />
  {:catch}
    <NoData />
  {/await}
</div>

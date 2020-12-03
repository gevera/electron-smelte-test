<script>
  import Loading from "../../components/common/Loading.svelte";
  import NoData from "../../components/common/NoData.svelte";
  import { fetchAllExecutors } from "../../utils/helpers/fetchers";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { Button } from "smelte";
  import { token } from "../../utils/stores/token";
  import { regions } from "../../utils/stores/regions";
  import { orderID } from "../../utils/stores/order";
  import { getName } from "../../utils/helpers/transformers";

  // const items = [
  //   {
  //     value: 1,
  //     text: "Avtive",
  //   },
  //   {
  //     value: 2,
  //     text: "Not Active",
  //   },
  // ];

  // let selectedActive = "";

  const viewContractor = (id) => {
    $activeHeader = "Просмотр исполнителя";
    $orderID = id;
  };
</script>

<div class="w-full h-full py-6">
  {#await fetchAllExecutors($token)}
    <Loading />
  {:then data}
    <div class="flex items-center justify-end px-6 mb-6">
      <!-- <Button class="mr-6" on:click={gotoNewContractor}>Создать нового</Button> -->
      <!-- <div class="flex items-center">
      <p class="text-dark-500 mr-2">Статус</p>
      <Select
        class="w-auto  p-2 border-none"
        outlined
        {items}
        bind:value={selectedActive} />
    </div> -->
    </div>
    <div class="mt-4">
      {#each data as exec, i (exec.user.pk)}
        <li
          class="cursor-pointer p-2 flex hover:bg-primary-200 items-center list-none"
          class:bg-gray-100={i % 2}>
          <div class="w-3/12 border-r pl-6 text-dark-500">
            {exec.first_name}
            {exec.last_name}
          </div>
          <div class="w-3/12 border-r pl-4 text-dark-500">
            {exec.user.phone}
          </div>
          <div class="w-5/12 border-r pl-4 text-dark-500">
            {getName($regions, exec.user.region)}
          </div>
          <div class="w-1/12 px-2 flex justify-start">
            <Button
              text
              light
              flat
              color="dark"
              icon="visibility"
              on:click={() => viewContractor(exec.user.pk)} />
          </div>
        </li>
      {/each}
    </div>
  {:catch}
    <NoData />
  {/await}
</div>

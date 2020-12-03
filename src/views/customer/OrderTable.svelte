<script>
  import { Switch } from "smelte";
  import { fetchAllOrders } from "../../utils/helpers/fetchers";
  import { token } from "../../utils/stores/token";
  import Submenu from "../../components/common/Submenu.svelte";
  import Loading from "../../components/common/Loading.svelte";
  import NoData from "../../components/common/NoData.svelte";
</script>

<div class="py-6">
  {#await fetchAllOrders($token)}
    <Loading />
  {:then data}
    <div class="px-6 flex items-center mb-4">
      <p class="mr-4 text-dark-500">Исполненные</p>
      <div class="pt-1">
        <Switch />
      </div>
    </div>
    <ul>
      {#each data as item, i (item.id)}
        <li
          class="cursor-pointer p-2 flex hover:bg-primary-200 items-center list-none"
          class:bg-gray-100={i % 2}>
          <div class="w-3/12 border-r pl-6 text-dark-500">{item.customer}</div>
          <div class="w-2/12 border-r pl-4 text-dark-500">
            {item.customer_number}
          </div>
          <div class="w-5/12 border-r pl-4 text-dark-500">
            г.
            {item.city}
            {item.customer_address}
          </div>
          <div class="w-2/12 px-2 flex justify-start">
            <Submenu id={item.id} />
          </div>
        </li>
      {/each}
    </ul>
  {:catch}
    <NoData />
  {/await}
</div>

<script>
  import { token } from "../../utils/stores/token";
  import { orderID } from "../../utils/stores/order";
  import { cities, regions } from "../../utils/stores/regions";
  import { getOrderStatus, getName } from "../../utils/helpers/transformers";
  import { fetchOrder } from "../../utils/helpers/fetchers";
  import NoData from '../../components/common/NoData.svelte';
  import Loading from '../../components/common/Loading.svelte';
</script>

<style>
</style>

<div class="">
  {#await fetchOrder($orderID, $token)}
    <Loading />
  {:then data}
    <div class="flex items-center justify-between p-6">
      <h5 class="text-dark-500"># {data.pk}</h5>
      <h5 class="text-primary-500">{getOrderStatus(data.status)}</h5>
    </div>
    <div class="">
      <table class="table-fixed w-full">
        <tbody class="text-md">
          <tr class="bg-gray-100">
            <th class="w-1/2 px-6 py-4 text-dark-500 font-light">
              Имя заказчика
            </th>
            <td class="w-1/2 px-6 py-4 text-dark-500">{data.customer}</td>
          </tr>
          <tr>
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Телефон</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">
              {data.customer_number}
            </td>
          </tr>
          <tr class="bg-gray-100">
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Адрес</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">
              г.
              {getName($cities, data.city)},
              {data.customer_address}
            </td>
          </tr>
          <tr>
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Регион</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">{getName($regions, data.region)}</td>
          </tr>
        </tbody>
      </table>
    </div>
    {:catch}
    <NoData />
  {/await}
</div>

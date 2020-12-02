<script>
  import { ProgressCircular } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { token } from "../../utils/stores/token";
  import { orderID } from "../../utils/stores/order";
  import { regions, cities } from "../../utils/stores/regions";

  let city = '',
      region = '',
      st = "",
      status = "Ищет исполнителя";

  const URL = `${$tempConfig.server_URL}${$tempConfig.orderCreate}${$orderID}/`;
  const fetchOrder = async () => {
    const response = await fetch(URL, {
      headers: {
        "Authorization": `token ${$token}`,
      },
    });
    const data = await response.json();
    st = data.st;
    city = $cities.filter(c => c.id == data.city)[0].name;
    region = $regions.filter(c => c.id == data.region)[0].name;
    return data;
  };
  $: if(st == 2) {
    status = "В работе"
  } else if (st == 3) {
    status = "Ожидает проверки"
  } else if (st == 4) {
    status = "Исполненно"
  }
</script>

<style>
</style>

<div class="">
  {#await fetchOrder()}
    <ProgressCircular />
  {:then data}
    <div class="flex items-center justify-between p-6">
      <h5 class="text-dark-500"># {data.pk}</h5>
    <h5 class="text-primary-500">{status}</h5>
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
            <td class="w-1/2 px-6 py-4  text-dark-500">{data.customer_number}</td>
          </tr>
          <tr class="bg-gray-100">
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Адрес</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">
              г. {city}, {data.customer_address}
            </td>
          </tr>
          <tr>
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Регион</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">
              {region}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  {/await}
</div>

<script>
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { orderID, status, customer } from "../../utils/stores/order";
  import { token } from "../../utils/stores/token";
  import { regions, cities } from "../../utils/stores/regions";
  import { ProgressCircular } from 'smelte';

  let city = "",
    region = "";


  const fetchOrder = async (id) => {
    const response = await fetch(`${$tempConfig.server_URL}${$tempConfig.orderCreate}${id}`, {
      headers: {
        Authorization: `token ${$token}`,
      },
    });
    const data = await response.json();
    $customer = data.customer;
    console.log(`DATA ORDER ==>> ${JSON.stringify(data, null, 2)}`);
    city = $cities.filter((c) => c.id == data.city)[0].name;
    region = $regions.filter((c) => c.id == data.region)[0].name;
    $status = data.status;
    return data;
  };
</script>

{#await fetchOrder($orderID)}
    <div class="w-full h-full grid place-items-center">
      <ProgressCircular />
    </div>
  {:then data}
    <!-- <h5 class="text-dark-500 px-6 mb-4"># {data.pk}</h5> -->
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

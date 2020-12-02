<script>
  import Heading from "../../components/common/Heading.svelte";
  import { orderID } from "../../utils/stores/order";
  import { token } from "../../utils/stores/token";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import NoData from "../../components/common/NoData.svelte";
  import { regions } from "../../utils/stores/regions";
let rg = '';
  const getExecutor = async () => {
    const response = await fetch(`${$tempConfig.server_URL}${$tempConfig.executor}${$orderID}`,
    {
      headers: {
        Authorization: `token ${$token}`,
      },
    });
    const data = await response.json();
    rg = data.user.region;
    console.log(data);
    return data;
  };

  $: region = ($regions.filter(r => r.id == rg)[0] || {}).name;
</script>

<div class="w-full h-full py-6">
  {#await getExecutor()}
    <NoData />
  {:then contr}
    <h5 class="text-dark-500 mb-2 px-6"># {contr.user.pk}</h5>
    <Heading heading="Фото" addClass="my-4 px-6" />
    <div class="flex px-6 mt-2 mb-4">
      <img src={contr.user.face_photo} alt="photo1" class="mr-4 w-24 h-24" />
      <img
        src={contr.user.passport_photo}
        alt="photo1"
        class="mr-4 w-24 h-24" />
      <img src={contr.user.adr_photo} alt="photo1" class="mr-4 w-24 h-24" />
    </div>
    <Heading heading="Данные" addClass="my-4 px-6" />

    <div class="">
      <table class="table-fixed w-full">
        <tbody class="text-md">
          <tr class="bg-gray-100">
            <th class="w-1/2 px-6 py-4 text-dark-500 font-light">ФИО</th>
            <td class="w-1/2 px-6 py-4 text-dark-500">
              {contr.first_name}
              {contr.last_name}
              {contr.second_name}
            </td>
          </tr>
          <tr>
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Телефон</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">{contr.user.phone}</td>
          </tr>
          <tr class="bg-gray-100">
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Почта</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">{contr.user.email}</td>
          </tr>
          <tr>
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Регион</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">{region}</td>
          </tr>
          <tr class="bg-gray-100">
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Баланс</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">50000 rub</td>
          </tr>
          <tr>
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">
              Кол-во закрытых заявок
            </th>
            <td class="w-1/2 px-6 py-4  text-dark-500">240</td>
          </tr>
          <tr class="bg-gray-100">
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Рейтинг</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">{contr.rating}</td>
          </tr>
        </tbody>
      </table>
    </div>
  {/await}
</div>

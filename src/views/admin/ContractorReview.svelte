<script>
  import Heading from "../../components/common/Heading.svelte";
  import NoData from "../../components/common/NoData.svelte";
  import Loading from "../../components/common/Loading.svelte";
  import { fetchExecutor } from "../../utils/helpers/fetchers";
  import { getName } from "../../utils/helpers/transformers";
  import { regions } from "../../utils/stores/regions";
  import { orderID } from "../../utils/stores/order";
  import { token } from "../../utils/stores/token";
</script>

<div class="w-full h-full py-6">
  {#await fetchExecutor($orderID, $token)}
    <Loading />
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
            <td class="w-1/2 px-6 py-4  text-dark-500">
              {getName($regions, contr.user.region)}
            </td>
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
  {:catch}
    <NoData />
  {/await}
</div>

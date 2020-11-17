<script>
  import Heading from "../../components/common/Heading.svelte";
</script>

<div class="w-full h-full py-6">
  <h5 class="text-dark-500 mb-2 px-6"># 3453453</h5>
  <Heading heading="Фото" addClass="my-4 px-6" />
  <div class="flex px-6 mt-2 mb-4">
    <img src="./images/avatar.jpeg" alt="photo1" class="mr-4 w-24 h-24" />
    <img src="./images/avatar.jpeg" alt="photo2" class="mr-4 w-24 h-24" />
  </div>
  <Heading heading="Данные" addClass="my-4 px-6" />

  <div class="">
    <table class="table-fixed w-full">
      <tbody class="text-md">
        <tr class="bg-gray-100">
          <th class="w-1/2 px-6 py-4 text-dark-500 font-light">Имя</th>
          <td class="w-1/2 px-6 py-4 text-dark-500">Geogre Luka</td>
        </tr>
        <tr>
          <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Телефон</th>
          <td class="w-1/2 px-6 py-4  text-dark-500">+8946213516</td>
        </tr>
        <tr class="bg-gray-100">
          <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Почта</th>
          <td class="w-1/2 px-6 py-4  text-dark-500">
            vasya@mail.com
          </td>
        </tr>
        <tr>
          <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Регион</th>
          <td class="w-1/2 px-6 py-4  text-dark-500">
            Республика Башкортостан
          </td>
        </tr>
        <tr class="bg-gray-100">
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Баланс</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">
              50000 rub
            </td>
          </tr>
          <tr>
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Кол-во закрытых заявок</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">
              240
            </td>
          </tr>
          <tr class="bg-gray-100">
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Рейтинг</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">
              4.7
            </td>
          </tr>
      </tbody>
    </table>
  </div>
</div>

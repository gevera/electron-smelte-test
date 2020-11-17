<script>
  import { Button } from "smelte";
  import Heading from "../../components/common/Heading.svelte";
</script>

<div class="w-full h-full p-6">
  <div>
    <div class="flex items-center justify-between mb-2">
      <h5 class="text-dark-500"># 45893465</h5>
      <Button text icon="block" add="text-dark-500" iconClass="mr-2">
        Заблокировать
      </Button>
    </div>
    <Heading heading="Исполнители" addClass="mb-6" />
    <Button class="mb-6">Смотреть всех исполнителей</Button>
    <Heading heading="Данные" addClass="mb-4" />

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
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Адрес</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">
              Ufa city, raz dva ulitza
            </td>
          </tr>
          <tr>
            <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Регион</th>
            <td class="w-1/2 px-6 py-4  text-dark-500">
              Республика Башкортостан
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<script>
  import { Button, Chip, TextField } from "smelte";
  import Heading from "../../components/common/Heading.svelte";
  import { slide } from "svelte/transition";
  import Person from "../..//components/common/Person.svelte";
  let showCity = false;
</script>

<div class="w-full h-full py-6 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between px-8 mb-2">
      <h5 class="text-dark-500"># 45893465</h5>
      <Button text icon="edit" add="text-primary-500" iconClass="mr-2">
        Редактировать
      </Button>
    </div>
    {#if !showCity}
      <div class="flex mb-1 px-8" out:slide={{ duration: 100, delay: 0 }}>
        <Button outlined class="mr-4">Сайт</Button>
        <Button outlined color="dark" class="mr-4">Программа</Button>
        <Button outlined color="dark" class="mr-4">Исполнитель</Button>
      </div>
      <div class="">
        <table class="table-fixed w-full my-2">
          <tbody class="text-md">
            <tr class="bg-gray-100">
              <th class="w-1/2 px-8 py-4  text-dark-500 font-light">Регион</th>
              <td class="w-1/2 px-8 py-4  text-dark-500">
                Республика Башкортостан
              </td>
            </tr>
            <tr>
              <th class="w-1/2 px-8 py-4 text-dark-500 font-light">
                Цена заявки
              </th>
              <td class="w-1/2 px-8 py-4 text-dark-500" />
            </tr>
            <tr class="bg-gray-100">
              <th class="w-1/2 px-8 py-4 text-dark-500 font-light">
                Ставка первого РП
              </th>
              <td class="w-1/2 px-8 py-4 text-dark-500">5000</td>
            </tr>
            <tr>
              <th class="w-1/2 px-8 py-4 text-dark-500 font-light">
                Ставка РП
              </th>
              <td class="w-1/2 px-8 py-4 text-dark-500">500</td>
            </tr>
            <tr class="bg-gray-100">
              <th class="w-1/2 px-8 py-4 text-dark-500 font-light">
                Ставка исполнителя
              </th>
              <td class="w-1/2 px-8 py-4 text-dark-500">50</td>
            </tr>
            <tr>
              <th class="w-1/2 px-8 py-4 text-dark-500 font-light">
                Процент системы
              </th>
              <td class="w-1/2 px-8 py-4 text-dark-500">5</td>
            </tr>
            <tr class="bg-gray-100">
              <th class="w-1/2 px-8 py-4 text-dark-500 font-light">
                Цена заявки по месту
              </th>
              <td class="w-1/2 px-8 py-4 text-dark-500">6</td>
            </tr>
          </tbody>
        </table>
      </div>
    {/if}
    <Heading heading="Города" addClass="px-8 mb-2" />
    <div class="flex items-center justify-center px-8">
      <Button
        text
        icon={showCity ? 'expand_more' : 'expand_less'}
        add="text-primary-500"
        iconClass="mr-2"
        on:click={() => (showCity = !showCity)}>
        {showCity ? 'Скрыть' : 'Показать'}
      </Button>
    </div>
    {#if showCity}
      <div class="px-8" in:slide={{ duration: 100 }}>
        <div class="flex mb-4">
          <Chip outlined removable>Ufa</Chip>
          <Chip outlined removable>Salavat</Chip>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex-grow">
            <TextField
              label="Добавить новый город "
              outlined
              color="secondary"
              prepend="public" />
          </div>
          <div class="ml-4 pb-2">
            <Button>Добавить</Button>
          </div>
        </div>
        <Heading heading="Региональные представители" />
        <div class="flex flex-wrap overflow-y-auto h-40">
          <Person />
          <Person />
        </div>
      </div>
      <div class="px-8 my-6 flex items-center cursor-pointer text-blue-500">
        <span class="material-icons mr-2">add_circle_outline</span><span class="hover:underline">Добавить нового
            регионального представителя</span>
      </div>
      <hr />
    {/if}
  </div>
  <div class="flex justify-end px-8">
    <Button>Назад</Button>
  </div>
</div>

<script>
  import { Button, Chip, TextField, Dialog } from "smelte";
  import { slide } from "svelte/transition";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { orderID } from "../../utils/stores/order";
  import { token } from "../../utils/stores/token";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { regions, cities } from "../../utils/stores/regions";
  import { getCities } from "../../utils/helpers/region";
  import Heading from "../../components/common/Heading.svelte";
  import Person from "../../components/common/Person.svelte";
  import { onMount } from "svelte";

  let newCityName = "",
    showConfirm = false,
    closed = false,
    cityID = "";

  $: addCityDisabled = newCityName.length == 0;

  const filters = [
    {
      id: 1,
      text: "Сайт",
    },
    {
      id: 2,
      text: "Заказчик",
    },
    {
      id: 3,
      text: "Исполнитель",
    },
  ];

  let activeFilter = "Сайт";

  const getRp = async () => {
    const response = await fetch(`${$tempConfig.server_URL}${$tempConfig.rp}`, {
      headers: {
        Authorization: `token ${$token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  };

  const addCity = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.city}`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${$token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ name: newCityName, region: $orderID }),
      }
    );
    if (response.ok) {
      getCities();
      newCityName = "";
    }
  };

  const removeCity = async (id) => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.city}${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `token ${$token}`,
          "content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      showConfirm = false;
      cityID = "";
      closed = true;
      getCities();
    }
  };

  const setConfirm = (id) => {
    cityID = id;
    showConfirm = true;
  };

  const changeMind = () => {
    showConfirm = false;
    closed = false;
  };

  const getRegion = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.region}${$orderID}/`,
      {
        headers: {
          Authorization: `token ${$token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  };

  $: citiFiltered = $cities.filter((c) => c.region == $orderID);
</script>

{#await getRegion()}
  <h4>Loading...</h4>
{:then data}
  <div class="w-full h-full py-6 flex flex-col justify-between">
    <div>
      <div class="flex items-center justify-between px-8 mb-2">
        <h5 class="text-dark-500">{data.name}</h5>
        <Button
          text
          icon="edit"
          add="text-primary-500"
          iconClass="mr-2"
          on:click={() => ($activeHeader = 'Редактирование региона')}>
          Редактировать
        </Button>
      </div>

      <div class="flex mb-1 px-8" out:slide={{ duration: 100, delay: 0 }}>
        {#each filters as filter}
          <Button
            outlined
            add={activeFilter == filter.text ? 'text-primary-500' : 'text-dark-500'}
            class="mr-4"
            on:click={() => (activeFilter = filter.text)}>
            {filter.text}
          </Button>
        {/each}
        <!-- <Button outlined color="dark" class="mr-4">Заказчик</Button>
        <Button outlined color="dark" class="mr-4">Исполнитель</Button> -->
      </div>
      <div class="">
        <table class="table-fixed w-full my-2">
          <tbody class="text-md">
            <tr class="bg-gray-100">
              <th class="w-2/3 px-8 py-4  text-dark-500 font-light">Регион</th>
              <td class="w-1/3 px-8 py-4  text-dark-500">{data.name}</td>
            </tr>
            {#if activeFilter == 'Сайт'}
              <tr>
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Стоимости заявки при оформлении с сайта
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.order_site_price}
                </td>
              </tr>
              <tr class="bg-gray-100">
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Ставка РП при оформлении заявки с сайта
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.rate_rp_site}
                </td>
              </tr>
              <tr>
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Ставка первого РП при оформлении заявки с сайта
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.rate_first_rp_site}
                </td>
              </tr>
              <tr class="bg-gray-100">
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Ставка исполнителя при оформлении заявки с сайта
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.executor_rate_site}
                </td>
              </tr>
              <tr>
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Комиссия системы при оформлении заявки с сайта
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.commission_site}
                </td>
              </tr>
            {:else if activeFilter == 'Заказчик'}
              <tr>
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Стоимости заявки при оформлении заказчиком
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.order_customer_price}
                </td>
              </tr>
              <tr class="bg-gray-100">
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Ставка РП при оформлении заявки заказчиком
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.rate_rp_customer}
                </td>
              </tr>
              <tr>
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Ставка исполнителя при оформлении заявки заказчиком
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.executor_rate_customer}
                </td>
              </tr>
              <tr class="bg-gray-100">
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Ставка первого РП при оформлении заявки заказчиком
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.rate_first_rp_customer}
                </td>
              </tr>
              <tr>
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Комиссия системы при оформлении заявки заказчиком
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.commission_customer}
                </td>
              </tr>
            {:else if activeFilter == 'Исполнитель'}
              <tr>
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Стоимости заявки при оформлении исполнителем
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.order_executor_price}
                </td>
              </tr>
              <tr class="bg-gray-100">
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Ставка РП при оформлении заявки исполнителем
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.rate_rp_executor}
                </td>
              </tr>
              <tr>
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Ставка исполнителя при оформлении заявки исполнителем
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.executor_rate_executor}
                </td>
              </tr>
              <tr class="bg-gray-100">
                <th class="w-2/3 px-8 py-4 text-dark-500 font-light">
                  Комиссия системы при оформлении заявки исполнителем
                </th>
                <td class="w-1/3 px-8 py-4 text-dark-500">
                  {data.commission_executor}
                </td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>

      <Heading heading="Города" addClass="px-8 mb-2" />

      <div class="px-8" in:slide={{ duration: 100 }}>
        <div class="flex mb-4">
          {#each citiFiltered as city (city.id)}
            <Chip
              icon="highlight_off"
              outlined
              on:click={() => setConfirm(city.id)}>
              {city.name}
            </Chip>
          {/each}
        </div>
        <div class="flex items-center justify-between">
          <div class="flex-grow">
            <TextField
              label="Добавить новый город "
              outlined
              color="secondary"
              prepend="public"
              bind:value={newCityName} />
          </div>
          <div class="ml-4 pb-2">
            <Button on:click={addCity} disabled={addCityDisabled}>
              Добавить
            </Button>
          </div>
        </div>
        <Heading heading="Региональные представители" />
        <div class="flex flex-wrap overflow-y-auto h-40">
          {#await getRp() then rps}
            {#each rps as rp}
              <Person {rp} />
            {/each}
          {/await}
        </div>
      </div>
      <div class="px-8 my-6 flex items-center cursor-pointer text-blue-500">
        <span class="material-icons mr-2">add_circle_outline</span><span
          class="hover:underline"
          on:click={() => ($activeHeader = 'Новый региональный представитель')}>Добавить
          нового регионального представителя</span>
      </div>
    </div>
    <div class="flex justify-end px-8">
      <Button on:click={() => ($activeHeader = 'Таблица регионов')}>
        Назад
      </Button>
    </div>
  </div>
{/await}

<Dialog bind:value={showConfirm}>
  <h5 slot="title" class="text-dark-500">
    Вы уверены что хотите удалить этот город из списка?
  </h5>
  <div slot="actions">
    <Button text color="dark" on:click={changeMind}>Нет</Button>
    <Button on:click={() => removeCity(cityID)}>Да</Button>
  </div>
</Dialog>

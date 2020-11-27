<script>
  import Heading from "../../components/common/Heading.svelte";
  import { Button, Snackbar } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { token } from "../../utils/stores/token";
  import { regions } from "../../utils/stores/regions";
  import { orderID } from "../../utils/stores/order";

  // TODO Fetch photos add Block functionality GET passport s id

  let status = "",
    region = "",
    showSnackbarSuccess = false,
    showSnackbarUnblock = false,
    showSnackbarFailure = false;
  let dataFetched;
  async function getData() {
    if (typeof window === "undefined") return;

    const res = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.executor}${$orderID}/`,
      {
        headers: {
          Authorization: `token ${$token}`,
        },
      }
    );
    const body = await res.json();
    dataFetched = body;
    region = $regions.filter((c) => c.id == dataFetched.user.region)[0].name;
    console.log(dataFetched);
    return dataFetched;
  }

  const blockContractor = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.executor}${$orderID}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${$token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...dataFetched, status: 0 }),
      }
    );
    if (response.ok) {
      console.log("Block!");
      showSnackbarSuccess = true;
    } else {
      showSnackbarFailure = true;
    }
  };
  const unblockContractor = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.executor}${$orderID}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${$token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...dataFetched, status: 1 }),
      }
    );
    if (response.ok) {
      showSnackbarUnblock = true;
    } else {
      showSnackbarFailure = true;
    }
  };
</script>

<div class="w-full h-full py-6">
  <div class="flex items-center justify-between px-6">
    <h5 class="text-dark-500 mb-2"># 3453453</h5>
    {#if (dataFetched || {}).status != 0}
      <Button
        text
        icon="block"
        add="text-dark-500"
        iconClass="mr-2"
        on:click={blockContractor}>
        Заблокировать
      </Button>
      {:else}
      <Button
        text
        icon="block"
        add="text-dark-500"
        iconClass="mr-2"
        on:click={unblockContractor}>
        Разблокировать
      </Button>
    {/if}
  </div>
  <Heading heading="Фото" addClass="my-4 px-6" />
  <div class="flex px-6 mt-2 mb-4">
    <img src="./images/avatar.jpeg" alt="photo1" class="mr-4 w-24 h-24" />
    <img src="./images/avatar.jpeg" alt="photo2" class="mr-4 w-24 h-24" />
  </div>
  <Heading heading="Данные" addClass="my-4 px-6" />

  {#await getData() then data}
    <div class="">
      <table class="table-fixed w-full">
        <tbody class="text-md">
          <tr class="bg-gray-100">
            <th class="w-1/2 px-6 py-4 text-dark-500 font-light">
              Имя исполнителя
            </th>
            <td class="w-1/2 px-6 py-4 text-dark-500">
              {data.first_name}
              {data.last_name}
            </td>
          </tr>
          <tr>
            <th class="w-1/2 px-6 py-4 text-dark-500 font-light">Телефон</th>
            <td class="w-1/2 px-6 py-4 text-dark-500">{data.user.phone}</td>
          </tr>
          <tr class="bg-gray-100">
            <th class="w-1/2 px-6 py-4 text-dark-500 font-light">Регион</th>
            <td class="w-1/2 px-6 py-4 text-dark-500">{region}</td>
          </tr>
        </tbody>
      </table>
    </div>
  {/await}
</div>

<Snackbar color="primary" top bind:value={showSnackbarSuccess} timeout={3000}>
  <div>Исполнители успешно заблокирован</div>
</Snackbar>
<Snackbar color="primary" top bind:value={showSnackbarUnblock} timeout={3000}>
  <div>Исполнители успешно разблокирован</div>
</Snackbar>
<Snackbar color="error" top bind:value={showSnackbarFailure} timeout={3000}>
  <div>Произошла ошибка. Попробуйте ещё раз позже</div>
</Snackbar>
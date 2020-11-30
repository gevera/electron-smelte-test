<script>
  import { Button, Dialog, Snackbar, Select } from "smelte";
  import Heading from "../../components/common/Heading.svelte";
  import { orderID } from "../../utils/stores/order";
  import { token } from "../../utils/stores/token";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { sidemenu } from "../../utils/stores/sidemenu";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { onMount } from "svelte";
  import Notifier from "../../components/common/Notifier.svelte";

  let showConfirm = false,
    rpID = "",
    backupID = "",
    allRps = [],
    represent = {},
    showSuccess = false,
    showFailure = false;

  const getRp = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.rp}${$orderID}/`,
      {
        headers: {
          Authorization: `token ${$token}`,
        },
      }
    );
    const data = await response.json();
    represent = { ...data };
    console.log(data);
    rpID = data.user.pk;
    return data;
  };

  const gotoContractors = () => {
    $sidemenu = [...$sidemenu].map((s) =>
      s.id != 1
        ? s
        : {
            id: 1,
            menu: s.menu.map((m) =>
              m.text == "Таблица исполнителей"
                ? { ...m, active: true }
                : { ...m, active: false }
            ),
          }
    );
    $activeHeader = "Таблица исполнителей";
  };

  const getAllRps = async () => {
    const response = await fetch(`${$tempConfig.server_URL}${$tempConfig.rp}`, {
      headers: {
        Authorization: `token ${$token}`,
      },
    });
    allRps = await response.json();
  };

  onMount(async () => {
    await getAllRps();
  });

  $: rpList = allRps
    .filter((rp) => rp.user.pk != rpID)
    .map((i) => ({ value: i.user.pk, text: `${i.first_name} ${i.last_name}` }));

  $: console.log(rpList);

  const blockRp = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.rp}${$orderID}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${$token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...represent, zam: backupID }),
      }
    );
    if (response.ok) {
      showSuccess = true;
    } else {
      showFailure = true;
    }
  };
</script>

<div class="w-full h-full p-6">
  {#await getRp()}
    <div class="h-full grid place-items-center">
      <h5>Loading...</h5>
    </div>
  {:then rp}
    <div>
      <div class="flex items-center justify-between mb-2">
        <h5 class="text-dark-500">{rp.first_name} {rp.last_name}</h5>
        <Button
          text
          icon="block"
          add="text-dark-500"
          iconClass="mr-2"
          on:click={() => (showConfirm = true)}>
          Заблокировать
        </Button>
      </div>
      <Heading heading="Исполнители" addClass="mb-6" />
      <Button class="mb-6" on:click={gotoContractors}>
        Смотреть всех исполнителей
      </Button>
      <Heading heading="Данные" addClass="mb-4" />

      <div class="">
        <table class="table-fixed w-full">
          <tbody class="text-md">
            <tr class="bg-gray-100">
              <th class="w-1/2 px-6 py-4 text-dark-500 font-light">Имя</th>
              <td class="w-1/2 px-6 py-4 text-dark-500">
                {rp.first_name}
                {rp.last_name}
                {rp.second_name}
              </td>
            </tr>
            <tr>
              <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Телефон</th>
              <td class="w-1/2 px-6 py-4  text-dark-500">{rp.user.phone}</td>
            </tr>

            <tr class="bg-gray-100">
              <th class="w-1/2 px-6 py-4  text-dark-500 font-light">Регион</th>
              <td class="w-1/2 px-6 py-4  text-dark-500">{rp.user.region}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  {/await}
</div>

<!-- TODO Add form with required fields -->
<Dialog bind:value={showConfirm}>
  <h5 slot="title" class="text-dark-500">Выберите заменяющего</h5>
  <Select
    outlined
    required
    color="secondary"
    label="Заменяющий"
    bind:value={backupID}
    items={rpList} />
  <div slot="actions">
    <Button text color="dark" on:click={() => (showConfirm = false)}>
      Нет
    </Button>
    <Button on:click={() => blockRp(rpID)}>Да</Button>
  </div>
</Dialog>

<Notifier
  {showSuccess}
  {showFailure}
  textSuccess="Региональный представитель успешно заменён" />

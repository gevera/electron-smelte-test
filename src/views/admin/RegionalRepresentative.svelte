<script>
  import { Button, Dialog, TextField, Select } from "smelte";
  import Heading from "../../components/common/Heading.svelte";
  import { orderID } from "../../utils/stores/order";
  import { token } from "../../utils/stores/token";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { sidemenu } from "../../utils/stores/sidemenu";
  import { fetchAllRPs, fetchRP } from "../../utils/helpers/fetchers";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { onMount } from "svelte";
  import Notifier from "../../components/common/Notifier.svelte";
  import Loading from "../../components/common/Loading.svelte";
  import NoData from "../../components/common/NoData.svelte";
  import { getName } from "../../utils/helpers/transformers";
  import { regions } from "../../utils/stores/regions";

  let showConfirm = false,
    rpID = "",
    password = "",
    backupID = "",
    allRps = [],
    represent = {},
    showSuccess = false,
    showFailure = false;

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

  onMount(async () => {
    allRps = await fetchAllRPs($token);
  });

  $: rpList = allRps
    .filter((rp) => rp.user.pk != rpID)
    .map((i) => ({ value: i.user.pk, text: `${i.first_name} ${i.last_name}` }));

  $: console.log(rpList);

  const triggerDialog = (rp) => {
    rpID = rp.user.pk;
    represent = { ...rp };
    showConfirm = true;
  };

  const blockRp = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.blockrp}${$orderID}/`,
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
      password = "";
      showConfirm = false;
    } else {
      showFailure = true;
    }
  };
</script>

<div class="w-full h-full p-6">
  {#await fetchRP($orderID, $token)}
    <Loading />
  {:then rp}
    <div>
      <div class="flex items-center justify-between mb-2">
        <h5 class="text-dark-500">{rp.first_name} {rp.last_name}</h5>
        <Button
          text
          icon="block"
          add="text-dark-500"
          iconClass="mr-2"
          disabled={rpList.length == 0}
          on:click={triggerDialog(rp)}>
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
              <td class="w-1/2 px-6 py-4  text-dark-500">
                {getName($regions, rp.user.region)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  {:catch}
    <NoData />
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

<script>
  import { DataTable, Select, Button } from "smelte";
  import Submenu from "../../components/common/Submenu.svelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { token } from "../../utils/stores/token";
  import { regions } from "../../utils/stores/regions";
  import { orderID } from "../../utils/stores/order";
  import { sidemenu } from "../../utils/stores/sidemenu";
  import { activeHeader } from "../../utils/stores/activeHeader";

  let dataFetched = [];
  let loading = false;
  async function getData() {
    if (typeof window === "undefined") return;
    loading = true;
    const res = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.executor}`,
      {
        headers: {
          Authorization: `token ${$token}`,
        },
      }
    );
    if (res.ok) {
      const body = await res.json();
      dataFetched = body;
      console.log(dataFetched);
      loading = false;
    }
  }

  const gotoNewContractor = () => {
    $sidemenu = [...$sidemenu].map((s) =>
      s.id != 2
        ? s
        : {
            id: 2,
            menu: s.menu.map((m) =>
              m.text == "Новый исполнитель"
                ? { ...m, active: true }
                : { ...m, active: false }
            ),
          }
    );
    $activeHeader = "Новый исполнитель";
  };

  const items = [
    {
      value: 1,
      text: "Avtive",
    },
    {
      value: 2,
      text: "Not Active",
    },
  ];

  let selectedActive = "";

  getData();

  $: data = dataFetched.map((u) => ({
    ...u,
    user: {
      ...u.user,
      region: [...$regions].filter((c) => c.id == u.user.region)[0].name,
    },
  }));

  const viewContractor = (id) => {
    $activeHeader = "Просмотр исполнителя";
    $orderID = id;
  };
</script>

<div class="w-full h-full py-6">
  <div class="flex items-center justify-end px-6 mb-6">
    <!-- <Button class="mr-6" on:click={gotoNewContractor}>Создать нового</Button> -->
    <div class="flex items-center">
      <p class="text-dark-500 mr-2">Статус</p>
      <Select
        class="w-auto  p-2 border-none"
        outlined
        {items}
        bind:value={selectedActive} />
    </div>
  </div>
  <div class="mt-4">
    {#each data as exec, i (exec.user.pk)}
      <li
        class="cursor-pointer p-2 flex hover:bg-primary-200 items-center list-none"
        class:bg-gray-100={i % 2}>
        <div class="w-3/12 border-r pl-6 text-dark-500">
          {exec.first_name}
          {exec.last_name}
        </div>
        <div class="w-3/12 border-r pl-4 text-dark-500">{exec.user.phone}</div>
        <div class="w-5/12 border-r pl-4 text-dark-500">{exec.user.region}</div>
        <div class="w-1/12 px-6 flex justify-start">
          <Button
            text
            light
            flat
            color="dark"
            icon="visibility"
            on:click={() => viewContractor(exec.user.pk)} />
        </div>
      </li>
    {/each}
  </div>
</div>

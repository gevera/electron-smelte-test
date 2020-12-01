<script>
  import { Switch, DataTable, Button, Menu, List } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { cities } from "../../utils/stores/regions";
  import { token } from "../../utils/stores/token";
  import Table from "../../components/common/Table.svelte";
  import Submenu from "../../components/common/Submenu.svelte";
  import { orderID } from "../../utils/stores/order";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import NoData from "../../components/common/NoData.svelte";

  let dataFetched = [];
  let loading = false;

  async function getData() {
    if (typeof window === "undefined") return;
    loading = true;
    const res = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.orderList}?status=3&approve_status=2`,
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

  getData();

  $: data = dataFetched
    .map((d) => ({
      ...d,
      city: [...$cities].filter((c) => c.id == d.city)[0].name,
    }))
    .filter((o) => o.moderation_time == null)
    .filter((o) => o.repeat_approve_time != 0)

  let open = false;
  let selected = "";

  const viewOrder = (id) => {
    $orderID = id;
    $activeHeader = "Проверка отчета по заявке";
  };

  $: console.table(data);
  $: console.log(selected);
</script>

<div class="py-6 h-full">
  {#if data.length == 0}
    <NoData />
  {:else}
    <ul>
      {#each data as item, i (item.id)}
        <li
          class="cursor-pointer p-2 flex hover:bg-primary-200 items-center list-none"
          class:bg-gray-100={i % 2}>
          <div class="w-3/12 border-r pl-6 text-dark-500">{item.customer}</div>
          <div class="w-2/12 border-r pl-4 text-dark-500">
            {item.customer_number}
          </div>
          <div class="w-5/12 border-r pl-4 text-dark-500">
            г.
            {item.city}
            {item.customer_address}
          </div>
          <div class="w-2/12 px-6 flex justify-start">
            <Button
              text
              light
              flat
              color="dark"
              icon="visibility"
              on:click={() => viewOrder(item.id)} />
          </div>
        </li>
      {/each}
    </ul>
  {/if}
  <div />
  <!-- <List items={data} dense>
    <li slot="item" let:item>
      <div class="cursor-pointer p-2 flex hover:bg-gray-200 items-center">
        <div class="w-3/12 border-r pl-6">{item.customer}</div>
        <div class="w-3/12 border-r pl-4">{item.customer_number}</div>
        <div class="w-5/12 border-r pl-4">
          г.
          {item.city}
          {item.customer_address}
        </div>
        <div class="w-1/12 px-3">
          <Menu
            bind:open
            items={[{ value: 1, text: 'Prosmotr' }, { value: 2, text: 'Redaktirovanie' }]}
            bind:value={selected}>
            <div slot="activator">
              <Button
                text
                light
                flat
                icon="more_vert"
                on:click={() => (open = !open)} />
            </div>
          </Menu>
        </div>
      </div>
    </li>
  </List> -->
  <!-- <DataTable
      {data}
      {loading}
      class="w-full h-full"
      on:update={({ detail }) => {
        const { column, item, value } = detail;
        const index = data.findIndex((i) => i.id === item.id);
        data[index][column.field] = value;
      }}
      columns={[
          { label: 'Имя', field: 'customer', class: '', editable: false },
          { label: 'Телефон', class: 'md:w-18 p-2', add: 'md:w-30 p-2', field: 'customer_number', editable: false },
          { label: 'Город', class: 'md:w-18', add: 'md:w-30 p-2', field: 'city', editable: false },
          { label: 'Адрес', add: 'text-left p-2', field: 'customer_address', editable: false, iconAfter: true },
          { label: '-', class: 'md:w-8', sortable: false, editable: false, value: () => `
                                <Menu bind:open {items} bind:value={selected}>
                                    <div slot="activator">
                                  <Button text light flat icon="more_vert on:click={() => open = !open}">
                                      <span class="material-icons text-primary-500">more_vert</span>
                                  </Button>
                                </div>
                                </Menu>` }]} /> -->
</div>

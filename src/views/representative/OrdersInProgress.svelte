<script>
  import { Select, Button } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { cities } from "../../utils/stores/regions";
  import { token } from "../../utils/stores/token";
  import { orderID } from "../../utils/stores/order";
  import Submenu from "../../components/common/Submenu.svelte";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import NoData from "../../components/common/NoData.svelte";

  let dataFetched = [];
  let city = "";
  let loading = false;

  async function getData() {
    if (typeof window === "undefined") return;
    loading = true;
    const res = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.orderList}`,
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
    .filter((o) => o.status == 2);

  $: itemsCity = [...$cities].map((r) => ({ value: r.id, text: r.name }));
</script>

<div class="py-6 h-full w-full">
  {#if data.length == 0}
    <NoData icon="work_outline" text="Заявок в работе пока нет" />
  {:else}
    <ul>
      {#each data as item, i (item.id)}
        <li
          class="cursor-pointer p-2 flex hover:bg-primary-200 items-center list-none"
          class:bg-gray-100={i % 2}>
          <div class="w-3/12 border-r pl-6 text-dark-500">{item.customer}</div>
          <div class="w-3/12 border-r pl-4 text-dark-500">
            {item.customer_number}
          </div>
          <div class="w-5/12 border-r pl-4 text-dark-500">
            г.
            {item.city}
            {item.customer_address}
          </div>
          <div class="w-1/12 px-2 flex justify-start">
            <!-- <Submenu id={item.id} icon="visibility"/> -->
            <Button
              text
              color="dark"
              icon="visibility"
              class="p-0"
              on:click={() => {
                $activeHeader = 'Просмотр заявки';
                $orderID = item.id;
              }} />
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>

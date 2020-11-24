<script>
  import { Select } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { cities } from "../../utils/stores/regions";
  import { token } from "../../utils/stores/token";
  import Submenu from "../../components/common/Submenu.svelte";

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

  $: console.log(data);
</script>

<style>
  .big {
    font-size: 48px;
  }
</style>

<div class="py-6 h-full w-full">
  {#if data.length == 0}
  <div class="h-full grid place-items-center"> 
    <div class="flex flex-col items-center">
      <span class="material-icons big text-dark-500">work_outline</span>
      <h5 class="text-dark-500 font-thin">Заявок в работе пока нет</h5>
    </div>
  </div>
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
            <Submenu id={item.id} />
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>

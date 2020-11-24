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

  $: data = dataFetched.map((d) => ({
    ...d,
    city: [...$cities].filter((c) => c.id == d.city)[0].name,
  }));

  $: itemsCity = [...$cities].map((r) => ({ value: r.id, text: r.name }));




  $: console.log(data);
</script>

<div class="py-6">
  <div class="flex px-6 items-center">
    <p class="text-dark-500 mr-2">Город</p>
    <Select
      bind:value={city}
      outlined
      autocomplete
      label="Город"
      items={itemsCity} />
  </div>
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
</div>

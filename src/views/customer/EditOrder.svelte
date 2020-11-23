<script>
  import { TextField, Select, Snackbar, ProgressCircular } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { token } from "../../utils/stores/token";
  import { orderID } from "../../utils/stores/order";
  import { regions, cities } from "../../utils/stores/regions";
  import { onMount } from "svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";

  let order = {
    customer: "",
    customer_number: "",
    customer_address: "",
    city: "",
    region: "",
    order_type: "",
    order_source: "",
  };

  let pk = "",
    showSnackbarSuccess = false,
    showSnackbarFailure = false;

  const URL = `${$tempConfig.server_URL}${$tempConfig.orderCreate}${$orderID}/`;

  const fetchOrder = async () => {
    const response = await fetch(URL, {
      headers: {
        Authorization: `token ${$token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    pk = data.pk;
    return data;
  };

  onMount(async () => {
    const fetchedData = await fetchOrder();
    const {
      customer,
      customer_number,
      customer_address,
      city,
      region,
      order_type,
      order_source,
    } = fetchedData;
    order = {
      customer,
      customer_number,
      customer_address,
      city,
      region,
      order_type,
      order_source,
      datail: "test"
    };
  });
  const saveEdit = async () => {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `token ${$token}`,
      },
      body: JSON.stringify(order),
    });
    if (response.ok) {
      showSnackbarSuccess = true;
    } else {
      showSnackbarFailure = true;
    }
  };

  $: console.log(order);
  $: itemsRegion = [...$regions].map((r) => ({ value: r.id, text: r.name }));
  $: itemsCity = [...$cities].map((r) => ({ value: r.id, text: r.name }));
</script>

<div class="w-full h-full p-8 flex flex-col justify-between">
  <div class="">
    <h5 class="text-dark-500 mb-6"># {pk}</h5>
    <TextField
      label="Имя клиента"
      outlined
      color="secondary"
      prepend="person"
      bind:value={order.customer} />
    <TextField
      label="Телефон клиента"
      outlined
      color="secondary"
      prepend="call"
      bind:value={order.customer_number} />
    <TextField
      label="Адрес клиента"
      outlined
      color="secondary"
      prepend="person_pin_circle"
      bind:value={order.customer_address} />
    <Select
      bind:value={order.region}
      outlined
      autocomplete
      label="Регион"
      items={itemsRegion} />
    <Select
      bind:value={order.city}
      outlined
      autocomplete
      label="Город"
      items={itemsCity} />
  </div>
  <SaveClose positive={saveEdit} />
</div>

<Snackbar color="primary" top bind:value={showSnackbarSuccess} timeout={5000}>
  <div>Данные успешно обновлены</div>
</Snackbar>

<Snackbar color="error" top bind:value={showSnackbarFailure} timeout={5000}>
  <div>Произошла ошибка. Попробуйте ещё раз позже</div>
</Snackbar>

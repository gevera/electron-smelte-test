<script>
  import { TextField, Select, Snackbar, ProgressCircular } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { token } from "../../utils/stores/token";
  import {fetchOrder} from '../../utils/helpers/fetchers'
  import { orderID } from "../../utils/stores/order";
  import { regions, cities } from "../../utils/stores/regions";
  import { onMount } from "svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import Notifier from "../../components/common/Notifier.svelte";

  // TODO not updating error 500 created_by
  let order = {
    customer: "",
    customer_number: "",
    customer_address: "",
    city: "",
    region: "",
    order_type: "",
    order_source: "",
  };

  let orderOriginal = {},
    showSuccess = false,
    showFailure = false;

 
  onMount(async () => {
    orderOriginal = await fetchOrder($orderID, $token);
    const {
      customer,
      customer_number,
      customer_address,
      city,
      region,
      created_by,
      order_type,
      order_source,
    } = orderOriginal;
    order = {
      customer,
      customer_number,
      customer_address,
      city,
      region,
      order_type,
      order_source,
      created_by,
    };
  });
  const saveEdit = async () => {
    const response = await fetch(`${$tempConfig.server_URL}${$tempConfig.orderCreate}${$orderID}/`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `token ${$token}`,
      },
      body: JSON.stringify(order),
    });
    if (response.ok) {
      showSuccess = true;
    } else {
      showFailure = true;
    }
  };

  $: pk = orderOriginal.pk;
  $: itemsRegion = [...$regions].map((r) => ({ value: r.id, text: r.name }));
  $: itemsCity = [...$cities].map((r) => ({ value: r.id, text: r.name }));
</script>

<div class="w-full h-full p-8 flex flex-col justify-between">
  <div class="">

    <h5 class="text-dark-500 mb-6"># {pk ? pk : ''}</h5>
    <TextField
      label="Имя клиента"
      outlined
      required
      color="secondary"
      prepend="person"
      bind:value={order.customer} />
    <TextField
      label="Телефон клиента"
      outlined
      required
      color="secondary"
      prepend="call"
      bind:value={order.customer_number} />
    <TextField
      label="Адрес клиента"
      outlined
      required
      color="secondary"
      prepend="person_pin_circle"
      bind:value={order.customer_address} />
    <Select
      bind:value={order.region}
      outlined
      required
      autocomplete
      label="Регион"
      items={itemsRegion} />
    <Select
      bind:value={order.city}
      outlined
      required
      autocomplete
      label="Город"
      items={itemsCity} />
  </div>
  <SaveClose positive={saveEdit} />
</div>

<Notifier {showSuccess} {showFailure} textSuccess="Данные успешно обновлены" />

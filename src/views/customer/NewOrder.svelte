<script>
  import { TextField, Button, Select, Snackbar } from "smelte";
  import { regions, cities } from "../../utils/stores/regions";
  import { token } from "../../utils/stores/token";
  import { user } from "../../utils/stores/user";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import Notifier from "../../components/common/Notifier.svelte";

  let customer_number = "",
    customer_address = "",
    customer = "",
    city = "",
    region = "",
    showSuccess = false,
    showFailure = false;

  $: itemsRegion = [...$regions].map((r) => ({ value: r.id, text: r.name }));
  $: itemsCity = [...$cities].map((r) => ({ value: r.id, text: r.name }));
  $: price = [...$regions].reduce(
    (acc, r) => (r.id == region ? acc + r.order_customer_price : acc + 0),
    0
  );

  const sendOrder = async () => {
    const newOrder = {
      customer,
      customer_address,
      customer_number,
      city,
      region,
    };
    const response = await fetch(`${$tempConfig.server_URL}/order/create/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `token ${$token}`,
      },
      body: JSON.stringify(newOrder),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      showSuccess = true;
      customer = "";
      customer_address = "";
      customer_number = "";
      city = "";
      region = "";
    } else {
      showFailure = true;
    }
  };
</script>

<form
  class="w-full h-full p-8 flex flex-col justify-between"
  on:submit|preventDefault={sendOrder}>
  <div class="">
    <TextField
      label="Имя клиента"
      outlined
      required
      color="secondary"
      bind:value={customer}
      prepend="person" />
    <TextField
      label="Телефон клиента"
      outlined
      required
      color="secondary"
      bind:value={customer_number}
      prepend="call" />
    <TextField
      label="Адрес клиента"
      outlined
      required
      color="secondary"
      bind:value={customer_address}
      prepend="person_pin_circle" />
    <Select
      bind:value={city}
      outlined
      autocomplete
      label="Город"
      items={itemsCity} />
    <Select
      bind:value={region}
      outlined
      required
      autocomplete
      label="Регион"
      items={itemsRegion} />

    <p class="text-dark-500">Итого: {price} рублей</p>
  </div>
  <div class="flex justify-end">
    <Button>Отправить</Button>
  </div>
</form>

<Notifier
  {showSuccess}
  {showFailure}
  textSuccess="Новая заявка успешно создана" />

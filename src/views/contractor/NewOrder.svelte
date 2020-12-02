<script>
  import { TextField, Button, Select, Snackbar } from "smelte";
  import { cities, regions } from "../../utils/stores/regions";
  import { token } from "../../utils/stores/token";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import Notifier from "../../components/common/Notifier.svelte";

  // TODO No new order being created with certain combination of region and city

  let customer_number = "",
    customer_address = "",
    customer = "",
    city = "",
    region = "",
    order_type = "",
    showSuccess = false,
    showFailure = false;

  $: itemsRegion = [...$regions].map((r) => ({ value: r.id, text: r.name }));
  $: itemsCity = [...$cities].map((r) => ({ value: r.id, text: r.name }));

  const newOrder = async () => {
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

  const items = [
    {
      value: 1,
      text: "Бесплатная",
    },
    {
      value: 2,
      text: "Платная",
    },
  ];
</script>

<form
  class="w-full h-full p-8 flex flex-col justify-between"
  on:submit|preventDefault={newOrder}>
  <div class="">
    <TextField
      label="Имя клиента"
      outlined
      required
      color="secondary"
      prepend="person"
      bind:value={customer} />
    <TextField
      label="Телефон клиента"
      outlined
      required
      color="secondary"
      prepend="call"
      bind:value={customer_number} />
    <TextField
      label="Адрес клиента"
      outlined
      required
      color="secondary"
      prepend="person_pin_circle"
      bind:value={customer_address} />
    <Select
      bind:value={region}
      outlined
      required
      autocomplete
      label="Регион"
      items={itemsRegion} />
    <Select
      bind:value={city}
      outlined
      required
      autocomplete
      label="Город"
      items={itemsCity} />
    <Select
      label="Тип оплаты"
      outlined
      required
      bind:value={order_type}
      color="secondary"
      class="w-1/2"
      {items} />
  </div>
  <div class="flex justify-end">
    <Button>Отправить</Button>
  </div>
</form>

<Notifier
  {showSuccess}
  {showFailure}
  textSuccess="Новая заявка успешно создана" />

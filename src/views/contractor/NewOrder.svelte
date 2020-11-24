<script>
  import { TextField, Button, Select, Snackbar } from "smelte";
  import { cities, regions } from "../../utils/stores/regions";
  import { token } from "../../utils/stores/token";
  import { tempConfig } from "../../utils/stores/tempConfigs";

  let customer_number = "",
    customer_address = "",
    customer = "",
    city = "",
    region = "",
    order_type = "",
    showSnackbarSuccess = false,
    showSnackbarFailure = false;

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
      showSnackbarSuccess = true;
      customer = "";
      customer_address = "";
      customer_number = "";
      city = "";
      region = "";
    } else {
      showSnackbarFailure = true;
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

<div class="w-full h-full p-8 flex flex-col justify-between">
  <div class="">
    <TextField
      label="Имя клиента"
      outlined
      color="secondary"
      prepend="person"
      bind:value={customer} />
    <TextField
      label="Телефон клиента"
      outlined
      color="secondary"
      prepend="call"
      bind:value={customer_number} />
    <TextField
      label="Адрес клиента"
      outlined
      color="secondary"
      prepend="person_pin_circle"
      bind:value={customer_address} />
    <Select
      bind:value={region}
      outlined
      autocomplete
      label="Регион"
      items={itemsRegion} />
    <Select
      bind:value={city}
      outlined
      autocomplete
      label="Город"
      items={itemsCity} />
    <Select
      label="Тип оплаты"
      outlined
      bind:value={order_type}
      color="secondary"
      class="w-1/2"
      {items} />
  </div>
  <div class="flex justify-end">
    <Button on:click={newOrder}>Отправить</Button>
  </div>
</div>

<Snackbar color="primary" top bind:value={showSnackbarSuccess} timeout={2000}>
  <div>Новая заявка успешно создана</div>
</Snackbar>
<Snackbar color="error" top bind:value={showSnackbarFailure} timeout={2000}>
  <div>Произошла ошибка. Попробуйте ещё раз позже</div>
</Snackbar>

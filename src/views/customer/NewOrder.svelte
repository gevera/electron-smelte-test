<script>
  import { TextField, Button, Select, Snackbar } from "smelte";
  import { regions, cities } from "../../utils/stores/regions";
  import { token } from "../../utils/stores/token";
  import { user } from "../../utils/stores/user";
  import { tempConfig } from "../../utils/stores/tempConfigs";

  let customer_number = "",
    customer_address = "",
    customer = "",
    city = "",
    region = "",
    showSnackbarSuccess = false,
    showSnackbarFailure = false;

  $: itemsRegion = [...$regions].map((r) => ({ value: r.id, text: r.name }));
  $: itemsCity = [...$cities].map((r) => ({ value: r.id, text: r.name }));
  $: price = [...$regions].reduce(
    (acc, r) => (r.id == region ? acc + r.order_customer_price : acc + 0),
    0
  );

  //         "status": 1,
  //         "created_by": 2,
  //         "order_type": 2,
  //         "order_source": 2,
  //         "order_amount": 100,

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
</script>

<div class="w-full h-full p-8 flex flex-col justify-between">
  <div class="">
    <TextField
      label="Имя клиента"
      outlined
      color="secondary"
      bind:value={customer}
      prepend="person" />
    <TextField
      label="Телефон клиента"
      outlined
      color="secondary"
      bind:value={customer_number}
      prepend="call" />
    <TextField
      label="Адрес клиента"
      outlined
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
      autocomplete
      label="Регион"
      items={itemsRegion} />

    <p class="text-dark-500">Итого: {price} рублей</p>
  </div>
  <div class="flex justify-end">
    <Button on:click={sendOrder}>Отправить</Button>
  </div>
</div>

<Snackbar color="primary" top bind:value={showSnackbarSuccess} timeout={2000}>
  <div>Новая заявка успешно создана</div>
</Snackbar>
<Snackbar color="error" top bind:value={showSnackbarFailure} timeout={2000}>
  <div>Произошла ошибка. Попробуйте ещё раз позже</div>
</Snackbar>

<script>
  import { TextField, Button, Select } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { token } from "../../utils/stores/token";
  import { regions, cities } from "../../utils/stores/regions";
import Notifier from "../../components/common/Notifier.svelte";
  let customer_number = "",
    customer_address = "",
    customer = "",
    order_type = "",
    region = "",
    city = "",
    showSuccess = false,
    showFailure = false;
    let itemsType = [
      {
        value: 1,
        text: 'Платная'
      },
      {
        value: 2,
        text: 'Бесплатная'
      }
    ];

  const sendNewOrder = async () => {
    const newOrder = {
      customer,
      customer_address,
      customer_number,
      order_type,
      region,
      city,
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
      order_type = "";
    } else {
      showFailure = true;
    }
  };
  $: itemsRegion = [...$regions].map((r) => ({ value: r.id, text: r.name }));
  $: itemsCity = [...$cities].map((r) => ({ value: r.id, text: r.name }));
</script>

<form class="w-full h-full p-8 flex flex-col justify-between" on:submit|preventDefault={sendNewOrder}>
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
      bind:value={city}
      outlined
      required
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
    <Select
      label="Тип заявки"
      outlined
      required
      color="secondary"
      class="w-1/2"
      bind:value={order_type}
      items={itemsType} />
  </div>
  <div class="flex justify-end">
    <Button>Отправить</Button>
  </div>
</form>

<Notifier {showSuccess} {showFailure} textSuccess="Новая заявка успешно создана"/>

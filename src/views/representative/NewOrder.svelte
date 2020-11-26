<script>
  import { TextField, Button, Select, Snackbar } from "smelte";
  let customer_number = "",
    customer_address = "",
    customer = "",
    order_type = "",
    showSnackbarSuccess = false,
    showSnackbarFailure = false;
    const sendNewOrder = async () => {
        
    }
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
      label="Тип заявки"
      outlined
      color="secondary"
      class="w-1/2"
      bind:value={order_type} />
  </div>
  <div class="flex justify-end">
    <Button on:click={sendNewOrder}>Отправить</Button>
  </div>
</div>

<Snackbar color="primary" top bind:value={showSnackbarSuccess} timeout={2000}>
    <div>Новая заявка успешно создана</div>
  </Snackbar>
  <Snackbar color="error" top bind:value={showSnackbarFailure} timeout={2000}>
    <div>Произошла ошибка. Попробуйте ещё раз позже</div>
  </Snackbar>

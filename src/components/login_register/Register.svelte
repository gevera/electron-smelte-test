<script>
  import { TextField, Button, Select, Snackbar } from "smelte";
  import { regions } from "../../utils/stores/regions";
  import { viewStates } from "../../utils/stores/viewStates";
  import { tempConfig } from "../../utils/stores/tempConfigs";
import Notifier from "../common/Notifier.svelte";

  let first_name = "",
    last_name = "",
    second_name = "",
    phone = "",
    email = "",
    password = "",
    password_check = "",
    region = "",
    showSuccess = false,
    showFailure = false;

  // http://81.30.178.216:8000/api/users/customer/ POST
  const registerCustomer = async () => {
    const newCustomer = {
      first_name,
      last_name,
      second_name,
      user: { email, region, phone, password },
    };
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.customer}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      }
    );
    if (response.ok) {
      first_name = "";
      last_name = "";
      second_name = "";
      email = "";
      region = "";
      phone = "";
      password = "";
      password_check = "";
      showSuccess = true;
      $viewStates = "login";
    } else {
      showFailure = true;
    }
  };

  $: items = [...$regions].map((r) => ({ value: r.id, text: r.name }));

  const gotoLogin = () => {
    $viewStates = "login";
  };

  $: password_ok = password == password_check;

  $: disabled =
    first_name.length > 2 &&
    last_name.length > 2 &&
    phone.length > 4 &&
    email.length > 4 &&
    password_ok &&
    password.length > 2 &&
    region;
</script>

<style>
  .register {
    height: 768px;
    width: 400px;
    background: #ffffff;
  }
</style>

<form
  class="register p-4 pt-2 rounded-md shadow-md"
  on:submit|preventDefault={registerCustomer}>
  <h6 class="text-center">Регистрация</h6>
  <TextField label="Имя" outlined color="secondary" bind:value={first_name} />
  <TextField
    label="Фамилия"
    outlined
    required
    color="secondary"
    bind:value={last_name} />
  <TextField
    label="Отчество"
    outlined
    required
    color="secondary"
    bind:value={second_name} />
  <TextField
    label="Эл. Почта"
    type="email"
    required
    outlined
    color="secondary"
    bind:value={email} />
  <TextField label="Телефон" outlined color="secondary" bind:value={phone} />
  <TextField
    label="Пароль"
    type="password"
    required
    outlined
    color="secondary"
    bind:value={password} />
  <TextField
    label="Подтвердите пароль"
    type="password"
    required
    outlined
    color="secondary"
    error={!password_ok}
    bind:value={password_check} />
  <Select bind:value={region} outlined autocomplete label="Регион" {items} />

  <Button block class="mt-0" disabled={!disabled}>Войти</Button>
  <p class="text-xs mt-2">
    Нажимая кнопку "Войти" вы подтверждаете своё согласие с
    <a href="/" class="text-primary-500 underline">офертой</a>
    Если у вас уже есть аккаунт перейдите
    <span
      on:click={gotoLogin}
      class="text-primary-500 underline cursor-pointer">по ссылке</span>
  </p>
</form>

<Notifier {showSuccess} {showFailure} textSuccess="Вы успешно зарегистрировались" />
<script>
  import { TextField, Button } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { viewStates } from "../../utils/stores/viewStates";
  import { token } from "../../utils/stores/token";
  import { user } from "../../utils/stores/user";
  import Notifier from "../common/Notifier.svelte";

  let password = "",
    password_check = "",
    showSuccess = false,
    showFailure = false;

  const updatePassword = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.password}${$user.user.pk}/`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `token ${$token}`,
        },
        body: JSON.stringify({ password }),
      }
    );

    if (response.ok) {
      showSuccess = true;
      localStorage.setItem("update_password", false);
      $viewStates = "active";
    } else {
      showFailure = true;
    }
  };
  $: password_ok = password == password_check;
  $: disabled = password_ok && password.length > 2;
</script>

<style>
  .new_password {
    width: 396px;
    height: 324px;
    background: #ffffff;
  }
</style>

<form
  class="new_password p-6 flex flex-col flex-between rounded-md shadow-md"
  on:submit|preventDefault={updatePassword}>
  <h5 class="text-center  my-2">Введите новый пароль</h5>
  <TextField
    label="Пароль"
    type="password"
    outlined
    required
    color="secondary"
    bind:value={password} />
  <TextField
    label="Подтвердите пароль"
    type="password"
    outlined
    required
    color="secondary"
    error={!password_ok}
    bind:value={password_check} />
  <Button block class="mt-0" disabled={!disabled}>Подтвердить</Button>
</form>

<Notifier
  {showSuccess}
  {showFailure}
  textSuccess="Вы успешно обновили пароль" />

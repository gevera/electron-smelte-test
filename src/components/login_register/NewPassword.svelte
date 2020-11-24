<script>
  import { TextField, Button } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { viewStates } from "../../utils/stores/viewStates";
  import { token } from "../../utils/stores/token";
  import { user } from "../../utils/stores/user";
  import { Snackbar } from "smelte";

  let password = "",
    password_check = "",
    showSnackbarSuccess = false,
    showSnackbarFailure = false;

  const updatePassword = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.password}${$user.user.pk}/`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `token ${$token}`,
        },
        body: JSON.stringify({password}),
      }
    );

    if (response.ok) {
      showSnackbarSuccess = true;
      localStorage.setItem("update_password", false);
      $viewStates = "active";
    } else {
      showSnackbarFailure = true;
    }
  };
  $: console.log($user);
  $: console.log($token);
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

<div class="new_password p-6 flex flex-col flex-between rounded-md shadow-md">
  <h5 class="text-center  my-2">Введите новый пароль</h5>
  <TextField
    label="Пароль"
    type="password"
    outlined
    color="secondary"
    bind:value={password} />
  <TextField
    label="Подтвердите пароль"
    type="password"
    outlined
    color="secondary"
    error={!password_ok}
    bind:value={password_check} />
  <Button block class="mt-0" on:click={updatePassword} disabled={!disabled}>
    Подтвердить
  </Button>
</div>

<Snackbar color="primary" top bind:value={showSnackbarSuccess} timeout={3000}>
  <div>Вы успешно обновили пароль</div>
</Snackbar>

<Snackbar color="error" top bind:value={showSnackbarFailure} timeout={5000}>
  <div>Произошла ошибка. Попробуйте ещё раз позже</div>
</Snackbar>

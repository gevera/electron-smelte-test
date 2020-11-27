<script>
  import Heading from "../../components/common/Heading.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import { TextField, Snackbar, Dialog, Button } from "smelte";
  import { user, wallet } from "../../utils/stores/user";
  import { getMe } from "../../utils/helpers/me";
  import { token } from "../../utils/stores/token";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { onMount } from "svelte";
  // TODO Fix updating meial or phone
  let phone = "",
    email = "",
    password = "",
    inn = "",
    bik = "",
    bank_name = "",
    calc_account = "",
    corr_account = "",
    showDialog = false,
    showSnackbarSuccess = false,
    showSnackbarFailure = false;

  const getWallet = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.wallet}`,
      {
        headers: {
          Authorization: `token ${$token}`,
        },
      }
    );
    const wallet = await response.json();
    return wallet[0];
  };

  onMount(async () => {
    const { data } = await getMe($token);
    const walletData = await getWallet();
    $wallet = { ...walletData };
    console.log(walletData);
    bank_name = walletData.bank_name;
    calc_account = walletData.calc_account;
    corr_account = walletData.corr_account;
    bik = walletData.bik;
    inn = walletData.inn;
    phone = data[0].user.phone;
    email = data[0].user.email;
  });
  const updateAccount = async () => {
    const responseWallet = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.wallet}${$wallet.id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${$token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...kosh,
          bik,
          bank_name,
          calc_account,
          corr_account,
        }),
      }
    );
    const responseAcc = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.executor}${$user.user.pk}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${$token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...$user,
          user: {
            ...$user.user,
            email,
            phone,
            password,
          },
        }),
      }
    );

    if (responseWallet.ok && responseAcc.ok) {
      showDialog = false;
      showSnackbarSuccess = true;
    } else {
      showSnackbarFailure = true;
    }
  };

  $: kosh = { ...$wallet };
</script>

<div class="h-full w-full flex flex-col justify-between py-6">
  <div class="px-6">
    <Heading heading="Общие данные" />
    <div class="my-4">
      <TextField
        label="Эл. почта"
        type="email"
        outlined
        color="secondary"
        bind:value={email} />
      <TextField
        label="Телефон"
        type="telephone"
        outlined
        color="secondary"
        bind:value={phone} />
    </div>
    <Heading heading="Платежные реквизиты" />
    <div class="my-4">
      <TextField
        label="Филиал"
        outlined
        color="secondary"
        bind:value={bank_name} />
      <TextField
        label="Р/C"
        outlined
        color="secondary"
        bind:value={calc_account} />
      <TextField
        label="К/C"
        outlined
        color="secondary"
        bind:value={corr_account} />
      <TextField label="БИК" outlined color="secondary" bind:value={bik} />
      <TextField label="ИНН" outlined color="secondary" bind:value={inn} />
    </div>
  </div>
  <SaveClose positive={() => (showDialog = true)} />
</div>

<Dialog bind:value={showDialog}>
  <h5 slot="title" class="text-centered text-dark-500">Подтвердите пароль</h5>
  <TextField outlined label="Пароль" type="password" bind:value={password} />
  <div slot="actions">
    <Button text color="dark" on:click={() => (showDialog = false)}>
      Отменить
    </Button>
    <Button text on:click={updateAccount}>Подтвердить</Button>
  </div>
</Dialog>

<Snackbar color="primary" top bind:value={showSnackbarSuccess} timeout={2000}>
  <div>Данные успешно обновлены</div>
</Snackbar>

<Snackbar color="error" top bind:value={showSnackbarFailure} timeout={2000}>
  <div>Произошла ошибка. Попробуйте ещё раз позже</div>
</Snackbar>

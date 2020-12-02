<script>
  import Heading from "../../components/common/Heading.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import { TextField, Snackbar, Dialog, Button } from "smelte";
  import { user, wallet } from "../../utils/stores/user";
  import { getMe } from "../../utils/helpers/me";
  import { token } from "../../utils/stores/token";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { onMount } from "svelte";
import Notifier from "../../components/common/Notifier.svelte";

// Issue Phone with this user already exists

  let userUpdated = {
      phone: "",
      email: "",
      password: "",
      region: "",
    },
    inn = "",
    bik = "",
    bank_name = "",
    calc_account = "",
    corr_account = "",
    showDialog = false,
    showSuccess = false,
    showFailure = false;

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
    // console.log(walletData);
    bank_name = walletData.bank_name;
    calc_account = walletData.calc_account;
    corr_account = walletData.corr_account;
    bik = walletData.bik;
    inn = walletData.inn;
    userUpdated.phone = data[0].user.phone;
    userUpdated.email = data[0].user.email;
    userUpdated.region = data[0].user.region;
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
          inn,
          bank_name,
          calc_account,
          corr_account,
        }),
      }
    );
    const usr = {
      user: {
        email: userUpdated.email,
        phone: userUpdated.phone,
        region: userUpdated.region,
        password: userUpdated.password,
      },
      first_rp: $user.first_rp,
      first_name: $user.first_name,
      last_name: $user.last_name,
      second_name: $user.second_name,
    };
    const responseAcc = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.rp}${$user.user.pk}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${$token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(usr),
      }
    );

    if (responseWallet.ok && responseAcc.ok) {
      showDialog = false;
      showSuccess = true;
    } else {
      showFailure = true;
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
        required
        color="secondary"
        bind:value={userUpdated.email} />
      <TextField
        label="Телефон"
        type="telephone"
        outlined
        required
        color="secondary"
        bind:value={userUpdated.phone} />
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
  <TextField
    outlined
    label="Пароль"
    type="password"
    bind:value={userUpdated.password} />
  <div slot="actions">
    <Button text color="dark" on:click={() => (showDialog = false)}>
      Отменить
    </Button>
    <Button text on:click={updateAccount}>Подтвердить</Button>
  </div>
</Dialog>

<Notifier {showSuccess} {showFailure} textSuccess="Данные успешно обновлены"/>
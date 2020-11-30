<script>
  import Heading from "../../components/common/Heading.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import { TextField, Dialog, Snackbar, Button } from "smelte";
  import Person from "../../components/common/Person.svelte";
  import { token } from "../../utils/stores/token";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { getMe } from "../../utils/helpers/me";
  import { onMount } from "svelte";
  import { wallet, user } from "../../utils/stores/user";
import Notifier from "../../components/common/Notifier.svelte";

  let email = "",
    phone = "",
    password = "",
    bik = "",
    bank_name = "",
    calc_account = "",
    corr_account = "",
    showDialog = false,
    showSuccess = false,
    showFailure = false;

  $: kosh = { ...$wallet };

  //TODO Get Regional representative data
  
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
    console.log(walletData);
    console.log(data[0]);
    $wallet = { ...walletData };
    bik = walletData.bik;
    bank_name = walletData.bank_name;
    calc_account = walletData.calc_account;
    corr_account = walletData.corr_account;
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
      showSuccess = true;
    } else {
      showFailure = true;
    }
  };
</script>

<div class="h-full w-full flex flex-col justify-between py-6">
  <div class="px-6">
    <Heading heading="Региональный представитель" />
    <!-- If rp present -->
    <Person />
    <Heading heading="Общие данные" />
    <div class="mt-4 flex">
      <div class="flex-grow mr-4">
        <TextField
          label="Эл. почта"
          type="email"
          required
          outlined
          color="secondary"
          class="mr-4"
          bind:value={email} />
      </div>
      <div class="flex-grow ml-4">
        <TextField
          label="Телефон"
          type="telephone"
          outlined
          required
          color="secondary"
          class="flex-grow"
          bind:value={phone} />
      </div>
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

<Notifier {showSuccess} {showFailure} textSuccess="Данные успешно обновлены" />
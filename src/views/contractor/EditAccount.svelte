<script>
  import Heading from "../../components/common/Heading.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import { TextField, Dialog, Snackbar, Button } from "smelte";
  import Person from "../../components/common/Person.svelte";
  import { token } from "../../utils/stores/token";
  import { getMe } from "../../utils/helpers/me";
  import { onMount } from "svelte";

  let email = "",
    phone = "",
    password = "",
    bik="",
    inn="",
    bank_code="",
    bank_name="",
    showDialog = false,
    showSnackbarSuccess = false,
    showSnackbarFailure = false;
  

  //TODO Get wallet data

  onMount(async () => {
    const { data } = await getMe($token);
    console.log(data[0]);
    phone = data[0].user.phone;
    email = data[0].user.email;
  });

  const updateAccount = async () => {

  }
</script>

<div class="h-full w-full flex flex-col justify-between py-6">
  <div class="px-6">
    <Heading heading="Региональный представитель" />
    <Person />
    <Heading heading="Общие данные" />
    <div class="mt-4 flex">
      <div class="flex-grow mr-4">
        <TextField
          label="Эл. почта"
          type="email"
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
          color="secondary"
          class="flex-grow"
          bind:value={phone} />
      </div>
    </div>
    <Heading heading="Платежные реквизиты" />
    <div class="my-4">
      <TextField label="Филиал" outlined color="secondary" />
      <TextField label="Р/C" outlined color="secondary" />
      <TextField label="К/C" outlined color="secondary" />
      <TextField label="БИК" outlined color="secondary" bind:value={bik}/>
    </div>
  </div>
  <SaveClose />
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


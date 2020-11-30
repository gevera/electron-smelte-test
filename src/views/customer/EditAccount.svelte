<script>
  import { TextField, Dialog, Button } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { getMe } from "../../utils/helpers/me";
  import { user } from "../../utils/stores/user";
  import { token } from "../../utils/stores/token";
  import { onMount } from "svelte";
  import Heading from "../../components/common/Heading.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import Notifier from "../../components/common/Notifier.svelte";

  let email = "",
    phone = "",
    password = "",
    showDialog = false,
    showSuccess = false,
    showFailure = false;

  onMount(async () => {
    const { data } = await getMe($token);
    console.log(data[0]);
    phone = data[0].user.phone;
    email = data[0].user.email;
  });

  const updateAccount = async () => {
    showDialog = false;
    const updatedUser = {
      ...$user,
      user: { ...$user.user, email, phone, password },
    };
    const response = await fetch(
      `${$tempConfig.server_URL}/users/customer/${$user.user.pk}/`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `token ${$token}`,
        },
        body: JSON.stringify({ ...updatedUser }),
      }
    );
    if (response.ok) {
      showSuccess = true;
      password = "";
    } else {
      showFailure = true;
    }
  };
</script>

<div class="w-full h-full p-8 flex flex-col justify-between">
  <div class="">
    <Heading heading="Общие данные" addClass="mb-6" />

    <TextField
      label="Эл. Почта"
      type="email"
      outlined
      required
      color="secondary"
      bind:value={email}
      prepend="email" />
    <TextField
      label="Телефон клиента"
      outlined
      required
      color="secondary"
      bind:value={phone}
      prepend="call"
      type="telephone" />
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

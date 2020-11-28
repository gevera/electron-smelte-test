<script>
  import Heading from "../../components/common/Heading.svelte";
  import { Button, TextField, Select, Snackbar } from "smelte";
  import { regions } from "../../utils/stores/regions";
  import { token } from "../../utils/stores/token";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  let region = "",
    phone = "",
    email = "",
    first_name = "",
    last_name = "",
    second_name = "",
    issued_by = "",
    passport_data = "",
    when_issued = "",
    password = "",
    showSnackbarSuccess = false,
    showSnackbarFailure = false;

  let imageF,
    imageP,
    imageR,
    fotka,
    passport,
    registration,
    readerF,
    readerP,
    readerR,
    fotoInput,
    passportInput,
    registrationInput;

  $: itemsRegion = [...$regions].map((r) => ({ value: r.id, text: r.name }));

  const onFotoSelected = (e) => {
    imageF = e.target.files[0];
    readerF = new FileReader();
    if (imageF) {
      readerF.readAsDataURL(imageF);
    }
    readerF.onload = (e) => {
      fotka = e.target.result;
      document.getElementById("fot").style.backgroundImage =
        "url(" + readerF.result + ")";
    };
  };

  const onPassportSelected = (e) => {
    imageP = e.target.files[0];
    readerP = new FileReader();
    if (imageP) {
      readerP.readAsDataURL(imageP);
    }
    readerP.onload = (e) => {
      passport = e.target.result;
      document.getElementById("psprt").style.backgroundImage =
        "url(" + readerP.result + ")";
    };
  };

  const onRegistrationSelected = (e) => {
    imageR = e.target.files[0];
    readerR = new FileReader();
    if (imageR) {
      readerR.readAsDataURL(imageR);
    }
    readerR.onload = (e) => {
      registration = e.target.result;
      document.getElementById("reg").style.backgroundImage =
        "url(" + readerR.result + ")";
    };
  };

  const sendPassport = async (id) => {
    const form = new FormData();
    form.append("face_photo", imageF);
    form.append("passport_photo", imageP);
    form.append("adr_photo", imageR);
    form.append("issued_by", issued_by);
    form.append("passport_data", passport_data);
    form.append("when_issued", when_issued);
    form.append("user", id);
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.passport}`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${$token}`,
        },
        body: form,
      }
    );
    if (response.ok) {
      showSnackbarSuccess = true;
    } else {
      showSnackbarFailure = true;
    }
  };

  const createContractor = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.executor}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `token ${$token}`,
        },
        body: JSON.stringify({
          user: {
            phone,
            region,
            password,
            email
          },
          first_name,
          last_name,
          second_name,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      await sendPassport(data.user.pk);
    }
  };
</script>

<div class="w-full h-full p-8 flex flex-col justify-between">
  <div class="">
    <Heading heading="Фото" addClass="mb-2" />
    <div class="flex h-48 px-6 items-center mb-4">
      <div
        class="h-full mr-6 grid place-items-center p-2 bg-cover bg-center"
        id="fot">
        <Button
          class=""
          on:click={() => {
            fotoInput.click();
          }}>
          Загрузить фото
        </Button>
        <input
          style="display:none"
          type="file"
          accept=".jpg, .jpeg, .png"
          on:change={(e) => onFotoSelected(e)}
          bind:this={fotoInput} />
        <!-- {#if fotka}<img class="object-contain" src={fotka} alt="fotka" />{/if} -->
      </div>
      <div
        class="h-full mr-6 grid place-items-center p-2 bg-cover bg-center"
        id="reg">
        <Button
          class=""
          on:click={() => {
            registrationInput.click();
          }}>
          Прописка
        </Button>
        <input
          style="display:none"
          type="file"
          accept=".jpg, .jpeg, .png"
          on:change={(e) => onRegistrationSelected(e)}
          bind:this={registrationInput} />
        <!-- {#if passport}<img class="object-contain" src={passport} alt="passport" />{/if} -->
      </div>
      <div
        class="h-full mr-6 grid place-items-center p-2 bg-cover bg-center"
        id="psprt">
        <Button
          class=""
          on:click={() => {
            passportInput.click();
          }}>
          Фото паспорта
        </Button>
        <input
          style="display:none"
          type="file"
          accept=".jpg, .jpeg, .png"
          on:change={(e) => onPassportSelected(e)}
          bind:this={passportInput} />
        <!-- {#if scan}<img class="object-contain" src={scan} alt="scan" />{/if} -->
      </div>
    </div>
    <Heading heading="Данные" addClass="mb-4" />
    <TextField label="Имя" outlined color="secondary" bind:value={first_name} />
    <TextField
      label="Фамилия"
      outlined
      color="secondary"
      bind:value={last_name} />
    <TextField
      label="Отчество"
      outlined
      color="secondary"
      bind:value={second_name} />
    <TextField label="Телефон" outlined color="secondary" bind:value={phone} />
    <TextField label="Эл. Почта" outlined color="secondary" type="email" bind:value={email} />
    <TextField
    label="Пароль"
    type="password"
    outlined
    color="secondary"
    bind:value={password} />
    <Select
    bind:value={region}
    outlined
    autocomplete
    label="Регион"
    items={itemsRegion} />
  </div>
  <Heading heading="Паспортные данные" addClass="mb-4" />
  <div>
    <TextField label="Номер паспорта" outlined color="secondary" bind:value={passport_data} />
    <TextField label="Кем выдан" outlined color="secondary" bind:value={issued_by} />
    <TextField outlined type="date" color="secondary" bind:value={when_issued} />

  </div>

  <div class="flex justify-end">
    <Button
      class="ml-2"
      add="shadow-none hover:shadow-md"
      on:click={createContractor}>
      Отправить
    </Button>
  </div>
</div>

<Snackbar color="primary" top bind:value={showSnackbarSuccess} timeout={2000}>
  <div>Новый исполнитель успешно добавлен</div>
</Snackbar>
<Snackbar color="error" top bind:value={showSnackbarFailure} timeout={2000}>
  <div>Произошла ошибка. Попробуйте ещё раз позже</div>
</Snackbar>

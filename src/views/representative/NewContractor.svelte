<script>
  import Heading from "../../components/common/Heading.svelte";
  import { Button, TextField, Select, Snackbar } from "smelte";
  import { regions } from "../../utils/stores/regions";
  import { token } from "../../utils/stores/token";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import Notifier from "../../components/common/Notifier.svelte";
  import { fade } from 'svelte/transition';
  // TODO go to Tablitza ispolnitelei after created succesffuly

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
    showSuccess = false,
    showFailure = false,
    replaceFoto = false,
    replacePassport = false,
    replaceRegistration = false;

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
      $activeHeader = "Таблица исполнителей";
      showSuccess = true;
    } else {
      showFailure = true;
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
            email,
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

  let activateSend = false;

  $: if (fotka && password && registration) {
    activateSend = true;
  }

  const showRemoveLogicF = () => {
    if (fotka) {
      replaceFoto = true;
    }
  };
  const showRemoveLogicR = () => {
    if (registration) {
      replaceRegistration= true;
    }
  };
  const showRemoveLogicP = () => {
    if (passport) {
      replacePassport = true;
    }
  };
</script>

<form
  class="w-full h-full p-8 flex flex-col justify-between"
  on:submit|preventDefault={createContractor}>
  <div class="">
    <Heading heading="Фото" addClass="mb-2" />

    <div class="flex h-48 px-6 items-center mb-4">
      <div
        class="w-48 h-48 mr-6 grid place-items-center p-2 bg-cover bg-center rounded-md cursor-pointer"
        on:mouseover={showRemoveLogicF}
        on:mouseleave={() => replaceFoto = false}
        id="fot">
        {#if !fotka}
          <Button
            class=""
            on:click={() => {
              fotoInput.click();
            }}>
            Загрузить фото
          </Button>
        {/if}
        {#if replaceFoto}
          <div transition:fade>
            <Button
              class=""
              on:click={() => {
                fotoInput.click();
              }}>
              Заменить фото
            </Button>
          </div>
        {/if}
        <input
          style="display:none"
          type="file"
          accept=".jpg, .jpeg, .png"
          on:change={(e) => onFotoSelected(e)}
          bind:this={fotoInput} />
        <!-- {#if fotka}<img class="object-contain" src={fotka} alt="fotka" />{/if} -->
      </div>

      <div
        class="w-48 h-48 mr-6 grid place-items-center p-2 bg-cover bg-center rounded-md cursor-pointer"
        id="reg"
        on:mouseover={showRemoveLogicR}
        on:mouseleave={() => replaceRegistration = false}>
        {#if !registration}
          <Button
            class=""
            on:click={() => {
              registrationInput.click();
            }}>
            Прописка
          </Button>
        {/if}
        {#if replaceRegistration}
          <div transition:fade>
            <Button
              class=""
              on:click={() => {
                registrationInput.click();
              }}>
              Заменить фото
            </Button>
          </div>
        {/if}
        <input
          style="display:none"
          type="file"
          accept=".jpg, .jpeg, .png"
          on:change={(e) => onRegistrationSelected(e)}
          bind:this={registrationInput} />
        <!-- {#if passport}<img class="object-contain" src={passport} alt="passport" />{/if} -->
      </div>

      <div
        class="w-48 h-48 mr-6 grid place-items-center p-2 bg-cover bg-center rounded-md cursor-pointer"
        id="psprt"
        on:mouseover={showRemoveLogicP}
        on:mouseleave={() => replacePassport = false}>
        {#if !passport}
          <Button
            class=""
            on:click={() => {
              passportInput.click();
            }}>
            Фото паспорта
          </Button>
        {/if}
        {#if replacePassport}
          <div transition:fade>
            <Button
              class=""
              on:click={() => {
                passportInput.click();
              }}>
              Заменить фото
            </Button>
          </div>
        {/if}
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
      required
      color="secondary"
      bind:value={last_name} />
    <TextField
      label="Отчество"
      outlined
      required
      color="secondary"
      bind:value={second_name} />
    <TextField label="Телефон" outlined color="secondary" bind:value={phone} />
    <TextField
      label="Эл. Почта"
      outlined
      required
      color="secondary"
      type="email"
      bind:value={email} />
    <TextField
      label="Пароль"
      type="password"
      outlined
      required
      color="secondary"
      bind:value={password} />
    <Select
      bind:value={region}
      outlined
      required
      autocomplete
      label="Регион"
      items={itemsRegion} />
  </div>

  <Heading heading="Паспортные данные" addClass="mb-4" />

  <div>
    <TextField
      label="Номер паспорта"
      outlined
      color="secondary"
      bind:value={passport_data} />
    <TextField
      label="Кем выдан"
      outlined
      color="secondary"
      bind:value={issued_by} />
    <TextField
      outlined
      type="date"
      color="secondary"
      bind:value={when_issued} />
  </div>

  <div class="flex justify-end">
    <Button
      class="ml-2"
      disabled={!activateSend}
      add="shadow-none hover:shadow-md">
      Отправить
    </Button>
  </div>
</form>

<Notifier
  {showSuccess}
  {showFailure}
  textSuccess="Новый исполнитель успешно добавлен" />

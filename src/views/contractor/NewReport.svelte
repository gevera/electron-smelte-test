<script>
  import { Button, TextField } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import Heading from "../../components/common/Heading.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import DataZakaz from "../../components/common/DataZakaz.svelte";
  import { orderID } from "../../utils/stores/order";
  import { token } from "../../utils/stores/token";
  let fotka, scan, fileinput, readerF, fotoInput, readerS, scanInput;
  let text = "";
  const onFotoSelected = (e) => {
    let image = e.target.files[0];
    readerF = new FileReader();
    if (image) {
      readerF.readAsDataURL(image);
    }
    readerF.onload = (e) => {
      fotka = e.target.result;
      document.getElementById("fot").style.backgroundImage =
        "url(" + readerF.result + ")";
    };
  };

  const onScanSelected = (e) => {
    let image = e.target.files[0];
    readerS = new FileReader();
    if (image) {
      readerS.readAsDataURL(image);
    }
    readerS.onload = (e) => {
      scan = e.target.result;
      document.getElementById("scn").style.backgroundImage =
        "url(" + readerS.result + ")";
    };
  };

  const sendFoto = async () => {
    const formData = new FormData();
    formData.append("images", fotka);
    // formData.append("dataFile", files[0]);
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.orderImage}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `token ${$token}`,
        },
        body: JSON.stringify({ images: formData, review: orderID})
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };

  const sendScan = async () => {
    //scans
  };
  const sendText = async () => {};

  const sendReport = async () => {
    if (fotka) {
      await sendFoto();
    }
    if (scan) {
      await sendScan();
    }
    if (text) {
      await sendText();
    }
  };
</script>

<style>
</style>

<div class="w-full h-full py-6 flex flex-col justify-between">
  <DataZakaz />

  <Heading heading="Фото" addClass="my-4 px-6" />
  <div class="flex h-48 px-6 items-center">
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
      id="scn">
      <Button
        class=""
        on:click={() => {
          scanInput.click();
        }}>
        Скан документа
      </Button>
      <input
        style="display:none"
        type="file"
        accept=".jpg, .jpeg, .png"
        on:change={(e) => onScanSelected(e)}
        bind:this={scanInput} />
      <!-- {#if scan}<img class="object-contain" src={scan} alt="scan" />{/if} -->
    </div>
  </div>
  <Heading heading="Отчет" addClass="my-4 px-6" />
  <div class="px-6">
    <TextField
      label="Сообщение"
      outlined
      color="secondary"
      textarea
      rows="5"
      bind:value={text} />
  </div>
  <SaveClose positive={sendReport} />
</div>

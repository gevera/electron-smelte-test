<script>
  const updateReport = () => {};
  import SaveClose from "./SaveClose.svelte";
  import Heading from "./Heading.svelte";
  import { Button, TextField } from "smelte";
  import { fade } from "svelte/transition";

  // TODO Finish up editding review data

  let text = "";

  let fotka,
    imageF,
    imageS,
    scan,
    fileinput,
    readerF,
    readerS,
    fotoInput,
    scanInput,
    showSuccess = false,
    showFailure = false,
    replaceFoto = false,
    replaceScan = false;

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

  const onScanSelected = (e) => {
    imageS = e.target.files[0];
    readerS = new FileReader();
    if (imageS) {
      readerS.readAsDataURL(imageS);
    }
    readerS.onload = (e) => {
      scan = e.target.result;
      document.getElementById("scn").style.backgroundImage =
        "url(" + readerS.result + ")";
    };
  };

  const showRemoveLogicF = () => {
    if (fotka) {
      replaceFoto = true;
    }
  };

  const showRemoveLogicS = () => {
    if (scan) {
      replaceScan = true;
    }
  };
</script>

<Heading heading="Фото" addClass="my-4 px-6" />
<div class="flex h-48 px-6 items-center">
  <div
    class="w-48 h-48 mr-6 grid place-items-center p-2 bg-cover bg-center rounded-md cursor-pointer"
    on:mouseover={showRemoveLogicF}
    on:mouseleave={() => (replaceFoto = false)}
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
    on:mouseover={showRemoveLogicS}
    on:mouseleave={() => (replaceScan = false)}
    id="scn">
    {#if !scan}
      <Button
        class=""
        on:click={() => {
          scanInput.click();
        }}>
        Скан документа
      </Button>
    {/if}
    {#if replaceScan}
      <div transition:fade>
        <Button
          class=""
          on:click={() => {
            scanInput.click();
          }}>
          Заменить фото
        </Button>
      </div>
    {/if}
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
<SaveClose positive={updateReport} />

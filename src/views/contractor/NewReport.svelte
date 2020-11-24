<script>
  import { Button, TextField } from "smelte";
  import Heading from "../../components/common/Heading.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import DataZakaz from "../../components/common/DataZakaz.svelte";
  let files, fotka, fileinput;
  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      fotka = e.target.result;
    };
  };
</script>

<style>
</style>

<div class="w-full h-full py-6 flex flex-col justify-between">
  <DataZakaz />

  <Heading heading="Фото" addClass="my-4 px-6" />
  <div class="flex px-6">
    <Button
      class="mr-6"
      on:click={() => {
        fileinput.click();
      }}>
      Загрузить фото
    </Button>
    <input
      style="display:none"
      type="file"
      accept=".jpg, .jpeg, .png"
      on:change={(e) => onFileSelected(e)}
      bind:this={fileinput} />
    <Button class="mr-2">Скан документа</Button>
  </div>
  <Heading heading="Отчет" addClass="my-4 px-6" />
  <div class="px-6">
    <TextField label="Сообщение" outlined color="secondary" textarea rows="5" />
  </div>
  <SaveClose />
</div>

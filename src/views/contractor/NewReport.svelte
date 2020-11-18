<script>
  import DataZakazchik from "../../components/common/DataZakazchik.svelte";
  import Heading from "../../components/common/Heading.svelte";
  import { Button, TextField } from "smelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
</script>

<div class="w-full h-full py-6 flex flex-col justify-between">
  <div>
    <h5 class="px-6 text-dark-500 mb-4"># 4985734953</h5>
    <DataZakazchik />
    <Heading heading="Фото" addClass="my-4 px-6" />
    <div class="flex px-6">
      <Button class="mr-6">Загрузить фото</Button>
      <Button class="mr-2">Скан документа</Button>
    </div>
    <Heading heading="Отчет" addClass="my-4 px-6" />
    <div class="px-6">
      <TextField
        label="Сообщение"
        outlined
        color="secondary"
        textarea
        rows="5" />
    </div>
  </div>
  <SaveClose />
</div>

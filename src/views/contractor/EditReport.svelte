<script>
  import Heading from "../../components/common/Heading.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import { TextField, Button } from "smelte";
</script>

<div class="h-full w-full flex flex-col justify-between py-6">
  <div class="px-6">
    <h5 class="text-dark-500 mb-2"># 2433242342</h5>
    <Heading heading="Фото" />
    <div class="flex my-6">
      <img src="./images/avatar.jpeg" alt="photo_big" class="h-32 w-32 mr-4" />
      <img src="./images/avatar.jpeg" alt="photo_big" class="h-32 w-32 mr-4" />
    </div>
    <div class="flex my-6">
      <Button class="mr-6" add="shadow-none hover:shadow-md">
        Загрузить фото
      </Button>
      <Button class="mr-2" add="shadow-none hover:shadow-md">
        Скан документа
      </Button>
    </div>
    <Heading heading="Отчет" />
    <TextField textarea label="Сообщение" rows="7" outlined color="secondary" />
  </div>
  <SaveClose />
</div>

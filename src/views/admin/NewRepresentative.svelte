<script>
  import Heading from "../../components/common/Heading.svelte";
  import { Button, TextField } from "smelte";
</script>

<div class="w-full h-full p-8 flex flex-col justify-between">
  <div class="">
    <Heading heading="Фото" addClass="mb-4"/>
    <div class="flex mb-6">
        <Button class="mr-6" add="shadow-none hover:shadow-md">Загрузить фото</Button>
        <Button class="mr-2" add="shadow-none hover:shadow-md">Фото паспорта</Button>
    </div>
    <Heading heading="Данные" addClass="mb-4"/>
    <TextField label="Имя" outlined color="secondary" prepend="person" />
    <TextField label="Телефон" outlined color="secondary" prepend="call" />
    <TextField label="Адрес" outlined color="secondary" prepend="person_pin_circle" />
    <TextField label="Регион" outlined color="secondary" prepend="public" />
    <TextField label="Город" outlined color="secondary" prepend="map" />
  </div>
  <div class="flex justify-end">
    <Button class="ml-2" add="shadow-none hover:shadow-md">Отправить</Button>
  </div>
</div>

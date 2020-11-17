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
      <TextField label="Имя" outlined color="secondary" />
      <TextField label="Фамилия" outlined color="secondary" />
      <TextField label="Отчество" outlined color="secondary"  />
      <TextField label="Телефон" outlined color="secondary"  />
      <TextField label="Регион" outlined color="secondary"  />
    </div>
    <div class="flex justify-end">
      <Button class="ml-2" add="shadow-none hover:shadow-md">Отправить</Button>
    </div>
  </div>
  
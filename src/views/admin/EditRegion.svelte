<script>
    import { TextField, Button } from "smelte";
    import Heading from "../../components/common/Heading.svelte";
  </script>
  
  <div class="w-full h-full p-8 flex flex-col justify-between">
    <div class="">
      <div>
        <Heading heading="Данные" addClass="mb-2"/>
        <TextField label="Регион" outlined color="secondary" prepend="public" />
        <TextField label="Города" outlined color="secondary" prepend="public" />
      </div>
      <div>
        <Heading heading="Категория 2" addClass="mb-2"/>
      </div>
      <TextField label="Ставка первого РП" outlined color="secondary" />
      <TextField label="Ставка РП " outlined color="secondary" />
      <TextField label="Ставка исполнителя" outlined color="secondary" />
      <TextField label="Процент системы" outlined color="secondary" />
    </div>
    <div class="flex justify-end">
        <div class="flex items-center">
            <Button
              outlined
              light
              color="dark"
              class="mx-2"
              add="shadow hover:shadow-md">
              Отмена
            </Button>
            <Button class="ml-2" add="shadow-none hover:shadow-md">Сохранить</Button>
          </div>
    </div>
  </div>
  
<script>
    import { TextField, Button } from "smelte";
  </script>
  
  <div class="w-full h-full p-8 flex flex-col justify-between">
    <div class="">
        <div class="flex items-center">
            <h5 class="text-dark-500 mb-6">Общие данные</h5>
            <div class="border-t-1 flex-1">
            </div>
        </div>
      <TextField label="Эл. Почта" outlined color="secondary" prepend="email"/>
      <TextField label="Телефон клиента" outlined color="secondary" prepend="call"/>
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
  
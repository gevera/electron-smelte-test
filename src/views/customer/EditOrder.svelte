<script>
  import { TextField, Button } from "smelte";
</script>

<div class="w-full h-full p-8 flex flex-col justify-between">
  <div class="">
    <h5 class="text-dark-500 mb-6"># 43534435</h5>
    <TextField label="Имя клиента" outlined color="secondary" prepend="person"/>
    <TextField label="Телефон клиента" outlined color="secondary" prepend="call" />
    <TextField label="Адрес клиента" outlined color="secondary" prepend="person_pin_circle"/>
    <TextField label="Регион" outlined color="secondary" prepend="public"/>
    <TextField label="Город" outlined color="secondary" prepend="map"/>
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

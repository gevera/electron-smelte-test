<script>
    import { TextField, Button } from "smelte";
</script>
<div class="w-full h-full p-8 flex flex-col justify-between">
    <div class="">
        <TextField label="Имя клиента" outlined color="secondary" prepend="person"/>
        <TextField label="Телефон клиента" outlined color="secondary" prepend="call"/>
        <TextField label="Адрес клиента" outlined color="secondary" prepend="person_pin_circle"/>
        <TextField label="Регион" outlined color="secondary" prepend="public"/>
        <TextField label="Город" outlined color="secondary" prepend="map"/>
        <p class="text-dark-500">Итого: 2000 рублей   </p>
    </div>
    <div class="flex justify-end">
        <Button>Отправить</Button>
    </div>
</div>
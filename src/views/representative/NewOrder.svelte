<script>
    import { TextField, Button, Select } from "smelte";
</script>
<div class="w-full h-full p-8 flex flex-col justify-between">
    <div class="">
        <TextField label="Имя клиента" outlined color="secondary" prepend="person"/>
        <TextField label="Телефон клиента" outlined color="secondary" prepend="call"/>
        <TextField label="Адрес клиента" outlined color="secondary" prepend="person_pin_circle"/>
        <Select label="Тип заявки" outlined color="secondary" class="w-1/2" />
    </div>
    <div class="flex justify-end">
        <Button>Отправить</Button>
    </div>
</div>
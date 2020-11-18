<script>
    import { TextField, Button, Select } from "smelte";
    const items  = [
        {
            value: 1, text: "Platnaya"
        },
        {
            value: 1, text: "Besplatnaya"
        }
    ]
</script>
<div class="w-full h-full p-8 flex flex-col justify-between">
    <div class="">
        <TextField label="Имя клиента" outlined color="secondary" prepend="person"/>
        <TextField label="Телефон клиента" outlined color="secondary" prepend="call"/>
        <TextField label="Адрес клиента" outlined color="secondary" prepend="person_pin_circle"/>
        <TextField label="Регион" outlined color="secondary" prepend="public"/>
        <TextField label="Город" outlined color="secondary" prepend="map"/>
        <Select label="Tip oplaty" outlined color="secondary" class="w-1/2" {items} />
    </div>
    <div class="flex justify-end">
        <Button>Отправить</Button>
    </div>
</div>
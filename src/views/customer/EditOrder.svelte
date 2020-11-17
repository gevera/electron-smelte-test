<script>
  import { TextField, Button } from "smelte";
import SaveClose from "../../components/common/SaveClose.svelte";
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
  <SaveClose />
</div>

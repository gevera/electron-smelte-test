<script>
  import Heading from "../../components/common/Heading.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import { TextField } from "smelte";
</script>

<div class="h-full w-full flex flex-col justify-between py-6">
  <div class="px-6">
    <Heading heading="Общие данные" />
    <div class="my-4">
      <TextField label="Эл. почта" type="email" outlined color="secondary" />
      <TextField label="Телефон" type="telephone" outlined color="secondary" />
    </div>
    <Heading heading="Платежные реквизиты" />
    <div class="my-4">
      <TextField label="Банк" outlined color="secondary" />
      <TextField label="ИНН" outlined color="secondary" />
    </div>
  </div>
  <SaveClose />
</div>

<script>
  import { TextField, Button } from "smelte";
  import Heading from "../../components/common/Heading.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
</script>

<div class="w-full h-full p-8 flex flex-col justify-between">
  <div class="">
    <Heading heading="Общие данные" addClass="mb-6" />

    <TextField
      label="Эл. Почта"
      type="email"
      outlined
      color="secondary"
      prepend="email" />
    <TextField
      label="Телефон клиента"
      outlined
      color="secondary"
      prepend="call"
      type="telephone" />
  </div>
  <SaveClose />
</div>

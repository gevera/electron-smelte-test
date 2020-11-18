<script>
  import Heading from "../../components/common/Heading.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import { TextField } from "smelte";
  import Person from "../../components/common/Person.svelte";
</script>

<div class="h-full w-full flex flex-col justify-between py-6">
  <div class="px-6">
    <Heading heading="Региональный представитель" />
    <Person />
    <Heading heading="Общие данные" />
    <div class="mt-4 flex">
      <div class="flex-grow mr-4">
        <TextField
          label="Эл. почта"
          type="email"
          outlined
          color="secondary"
          class="mr-4" />
      </div>
      <div class="flex-grow ml-4">
        <TextField
          label="Телефон"
          type="telephone"
          outlined
          color="secondary"
          class="flex-grow" />
      </div>
    </div>
    <Heading heading="Платежные реквизиты" />
    <div class="my-4">
      <TextField label="Филиал" outlined color="secondary" />
      <TextField label="Р/C" outlined color="secondary" />
      <TextField label="К/C" outlined color="secondary" />
      <TextField label="БИК" outlined color="secondary" />
    </div>
  </div>
  <SaveClose />
</div>

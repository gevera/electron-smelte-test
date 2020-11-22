<script>
  import { Button } from "smelte";
  export let positive;
  export let negative;
</script>

<div class="flex justify-end px-6">
  <div class="flex items-center">
    <Button
      outlined
      light
      color="dark"
      class="mx-2"
      add="shadow hover:shadow-md"
      on:click={negative}>
      Отмена
    </Button>
    <Button class="ml-2" add="shadow-none hover:shadow-md" on:click={positive}>
      Сохранить
    </Button>
  </div>
</div>

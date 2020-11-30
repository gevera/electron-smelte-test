<script>
  import { Button } from "smelte";
  export let positive;
  export let negative;
  export let wordPositive = "Сохранить";
  export let wordNegative = "Отмена";
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
      {wordNegative}
    </Button>
    <Button class="ml-2" add="shadow-none hover:shadow-md" on:click={positive}>
      {wordPositive}
    </Button>
  </div>
</div>

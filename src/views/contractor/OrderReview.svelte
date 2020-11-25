<script>
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { status } from "../../utils/stores/order";
  import { Button } from "smelte";
  import Heading from "../../components/common/Heading.svelte";
  import DataZakaz from "../../components/common/DataZakaz.svelte";

  const gotoAddReport = () => {
    $activeHeader = "Новый отчет";
  };
  const editOrder = () => {}
</script>

<style>
</style>

<div class="py-6">
  <DataZakaz />
  {#if $status == 2}
  <Heading heading="Отчет" addClass="my-6 px-6" />
  <div class="px-6 my-6 flex items-center text-blue-500">
    <span
      class="material-icons mr-2 cursor-pointer">add_circle_outline</span><span
      class="hover:underline cursor-pointer"
      on:click={gotoAddReport}>Добавить отчет</span>
  </div>
  {:else if $status == 3}
  <div class="flex items-center justify-between mt-2 px-6">
    <Heading heading="Отчет" addClass="mr-4 flex-grow" />
    <Button
      text
      icon="edit"
      add="text-primary-500"
      iconClass="mr-6"
      on:click={editOrder}>
      Редактировать
    </Button>
  </div>
  <div class="flex px-6 justify-between">
    <img src="./images/avatar.jpeg" alt="photo_report" class="w-32 h-32 mr-4" />
    <p class="flex-grow">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi esse
      perferendis laudantium quos, nobis ex rerum at laborum est provident
      voluptates fuga dolorum! Exercitationem, aliquid incidunt laudantium
      reprehenderit odit deserunt.
    </p>
  </div>
  {/if}
</div>

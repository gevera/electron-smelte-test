<script>
  import { activeHeader } from "../../utils/stores/activeHeader";
  import Heading from "../../components/common/Heading.svelte";
  import DataZakaz from "../../components/common/DataZakaz.svelte";

  const gotoAddReport = () => {
    $activeHeader = "Новый отчет";
  };
</script>

<style>
</style>

<div class="py-6">
  <DataZakaz />
  <Heading heading="Отчет" addClass="my-6 px-6" />
  <div class="px-6 my-6 flex items-center text-blue-500">
    <span
      class="material-icons mr-2 cursor-pointer">add_circle_outline</span><span
      class="hover:underline cursor-pointer"
      on:click={gotoAddReport}>Добавить отчет</span>
  </div>
</div>

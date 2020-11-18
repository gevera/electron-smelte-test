<script>
  import DataZakazchik from "../../components/common/DataZakazchik.svelte";
  import Heading from "../../components/common/Heading.svelte";
</script>

<style>
</style>

<div class="">
  <div class="flex items-center justify-between p-6">
    <h5 class="text-dark-500"># 43534435</h5>
    <h5 class="text-primary-500">Пожаловаться</h5>
  </div>
  <div class="">
    <DataZakazchik />
  </div>
  <Heading heading="Отчет" addClass="my-6 px-6" />
  <div class="px-6 my-6 flex items-center cursor-pointer text-blue-500">
    <span class="material-icons mr-2">add_circle_outline</span><span
      class="hover:underline">Добавить отчет</span>
  </div>
</div>

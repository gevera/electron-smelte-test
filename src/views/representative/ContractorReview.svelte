<script>
  import Heading from "../../components/common/Heading.svelte";
  import { Button } from "smelte";
  import DataZakazchik from "../../components/common/DataZakaz.svelte";
</script>

<div class="w-full h-full py-6">
  <div class="flex items-center justify-between px-6">
    <h5 class="text-dark-500 mb-2"># 3453453</h5>
    <Button text icon="block" add="text-dark-500" iconClass="mr-2">
      Заблокировать
    </Button>
  </div>
  <Heading heading="Фото" addClass="my-4 px-6" />
  <div class="flex px-6 mt-2 mb-4">
    <img src="./images/avatar.jpeg" alt="photo1" class="mr-4 w-24 h-24" />
    <img src="./images/avatar.jpeg" alt="photo2" class="mr-4 w-24 h-24" />
  </div>
  <Heading heading="Данные" addClass="my-4 px-6" />

  <DataZakazchik />
</div>

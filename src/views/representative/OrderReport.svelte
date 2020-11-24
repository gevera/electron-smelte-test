<script>
  import { Button } from "smelte";
  import DataZakaz from "../../components/common/DataZakaz.svelte";
  import Heading from "../../components/common/Heading.svelte";
  import Person from "../../components/common/Person.svelte";
import SaveClose from "../../components/common/SaveClose.svelte";
  let showReport = false;
</script>

<div class="h-full w-full py-6 flex flex-col justify-between">
  <div class="">
    <h5 class="text-dark-500 px-6 mb-4"># 34230324</h5>
    <div class="flex px-6 justify-around">
      <div class="flex-grow mr-4">
        <Heading heading="Заказчик" />
        <Person />
      </div>
      <div class="flex-grow ml-4">
        <Heading heading="Исполнитель" />
        <Person />
      </div>
    </div>
    <Heading heading="Данные" addClass="my-2 mx-4" />
    <DataZakaz />

    <div class="flex items-center justify-between mt-2 px-6">
      <Heading heading="Отчет" addClass="mr-4 flex-grow" />
      <Button
        text
        icon="edit"
        add="text-primary-500"
        iconClass="mr-6"
        on:click={() => (showReport = !showReport)}>
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
  </div>
  <SaveClose />
</div>

<script>
  import Heading from "../../components/common/Heading.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import { TextField, Button } from "smelte";
  import DataZakaz from "../../components/common/DataZakaz.svelte";
</script>

<div class="h-full w-full flex flex-col justify-between py-6">
  <div class="">
    <h5 class="text-dark-500 mb-2 px-6"># 2433242342</h5>
    <Heading heading="Информатция" addClass="px-6" />
    <DataZakaz />
    <Heading heading="Отчет" addClass="px-6" />
    <div class="flex my-6 px-6">
      <img src="./images/avatar.jpeg" alt="photo_big" class="h-32 w-32 mr-4" />
      <img src="./images/avatar.jpeg" alt="photo_big" class="h-32 w-32 mr-4" />
    </div>
    <p class="px-6 text-sm">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ipsa
      ipsam illum illo officia excepturi aliquid. Sunt, minus. Illo nisi
      molestiae vitae reprehenderit commodi? Quos voluptate vel error modi
      voluptatem.
    </p>
  </div>
  <div class="flex justify-end px-6">
    <Button>Отправить</Button>
  </div>
</div>

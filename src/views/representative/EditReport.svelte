<script>
import Heading from "../../components/common/Heading.svelte";
import SaveClose from "../../components/common/SaveClose.svelte";
import {TextField} from 'smelte';
</script>
<div class="h-full w-full flex flex-col justify-between py-6">
    <div class="px-6">
      <h5 class="text-dark-500 mb-2"># 2433242342</h5>
      <Heading heading="Фото" />
      <div class="flex my-6">
          <img src="./images/avatar.jpeg" alt="photo_big" class="h-32 w-32 mr-4">
          <img src="./images/avatar.jpeg" alt="photo_big" class="h-32 w-32 mr-4">
      </div>
      <TextField textarea label="Сообщение" rows="7" outlined color="secondary" />
    </div>
    <SaveClose />
</div>
<script>
  import { Button, Chip } from "smelte";
  import { user } from "../../utils/stores/user";
  import { regions } from "../../utils/stores/regions";
  import { activeHeader } from "../../utils/stores/activeHeader";


  $: region = $regions.filter((r) => r.id == $user.user.region)[0].name;

</script>

<div class="flex items-center justify-between w-full p-2">
  <div class="border-l-4 border-primary-500 pl-4">
    <h5 class="text-dark-500">{$activeHeader}</h5>
  </div>
  <div class="flex justify-end">
    <Button text flat color="dark" icon="notifications" />
    <Button text flat color="dark" icon="settings" />
    <div class="border-l-2 pl-4 flex items-center">
      <div class="mr-2">
        <h6 class="text-drk-500 font-light mb-1">
          {$user.first_name}
          {$user.last_name}
        </h6>
        <p class="text-sm text-dark-500">{region}</p>
      </div>
      <img
        class="rounded-full border-2 border-primary-500 h-16 w-16"
        src="./images/avatar.jpeg"
        alt="avatar" />
    </div>
  </div>
</div>

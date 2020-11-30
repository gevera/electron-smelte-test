<script>
  import { Button } from "smelte";
  export let rp = {
    imgUrl: "./images/avatar.jpeg",
    first_name: "Jora",
    last_name: "kardan",
  };
</script>

<style>
  .person {
    width: 237px;
    height: 70px;
  }
</style>

<div class="person flex items-center justify-between mb-2 mr-4 border raunded-md">
  <div class="flex px-1 items-center">
    <img src={rp.imgUrl} alt="avatar" class="rounded-full w-12 h-12 mx-2"/>
    <div class="flex flex-col">
      <p>{rp.first_name}</p>
      <p>{rp.last_name}</p>
    </div>
  </div>
  <div class="border-l-2">
    <Button text flat light color="dark" icon="more_vert" />
  </div>
</div>

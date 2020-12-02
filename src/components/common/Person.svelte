<script>
  import { onMount } from "svelte";
  import { Button, ProgressLinear } from "smelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { token } from "../../utils/stores/token";
  export let rp = {
    imgUrl: "/images/avatar.jpeg",
    first_name: "Jora",
    last_name: "kardan",
  };
  export let id;
  export let customer;
  const fetchPerson = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.rp}${id}/`,
      {
        headers: {
          Authorization: `token ${$token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("PERSON ====>", data);
    }
  };
</script>

<div
  class="flex items-center justify-between mb-2 mr-4 border raunded-md w-48 h-16">
  {#if id}
    {#await fetchPerson()}
      <div>
        <ProgressLinear />
      </div>
    {:then data}
      <div class="flex px-1 items-center">
       
        <img src={(data.user || {}).face_photo || '/images/avatar.jpeg'} alt="avatar" class="rounded-full w-12 h-12 mx-2" />
       
        <div class="flex flex-col">
          <p>{data.first_name}</p>
          <p>{data.last_name}</p>
        </div>
      </div>
      <!-- <div class="border-l-2">
    <Button text flat light color="dark" icon="more_vert" />
  </div> -->
    {/await}
  {:else}
    <div class="flex px-1 items-center">
      <img src={(rp.user || {}).face_photo || '/images/avatar.jpeg'} alt="avatar" class="rounded-full w-12 h-12 mx-2" />
      <div class="flex flex-col">
        {#if !customer}
          <p>{rp.first_name}</p>
          <p>{rp.last_name}</p>
        {:else}
          <p>{customer}</p>
        {/if}
      </div>
    </div>
  {/if}
</div>

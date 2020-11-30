<style>
  .big {
    font-size: 48px;
  }
</style>

<script>
  export let icon = "search_off";
  export let text = "Нет данных";
</script>

<div class="h-full grid place-items-center">
  <div class="flex flex-col items-center">
  <span class="material-icons big text-dark-500">{icon}</span>
  <h5 class="text-dark-500 font-thin mt-4">{text}</h5>
  </div>
</div>
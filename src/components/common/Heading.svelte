<script>
  export let heading = "Header";
  export let addClass = '';
</script>

<div class={`flex items-center mb-2 ${addClass}`} >
  <h5 class="text-dark-500">{heading}</h5>
  <div class="ml-4 border-b-2 flex-grow" />
</div>

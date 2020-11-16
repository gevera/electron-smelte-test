<script>
  import Sidebar from "./Sidebar.svelte";
  import Action from "./Action.svelte";
</script>

<style>
  .back {
    background-color: #e5e5e5;
  }
</style>

<div class="h-screen w-screen bg-white flex">
  <div class="flex-1 back">
    <Sidebar />
  </div>
  <Action />
</div>

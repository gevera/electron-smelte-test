<script>
  import Header from "./Header.svelte";

  // import { user } from "../../utils/stores/user";
  // console.log($user);

  export let user;

  import CustomerSwitcher from "./CustomerSwitcher.svelte";
  import AdminSwitcher from "./AdminSwitcher.svelte";
  import ContractorSwitcher from "./ContractorSwitcher.svelte";
  import RepresentativeSwitcher from "./RepresentativeSwitcher.svelte";

</script>

<style>
  .size {
    min-height: 600px;
    min-width: 800px;
  }
  .back {
    background-color: #e5e5e5;
  }
</style>

<main class="w-full h-full p-6 back flex flex-col justify-between">
  <Header {user} />
  <div class="rounded-md shadow-md bg-white flex-1 mt-6">
    {#if (user.user || {}).groups == 4}
      <CustomerSwitcher />
    {:else if (user.user || {}).groups == 3}
      <ContractorSwitcher />
    {:else if (user.user || {}).groups == 2}
      <RepresentativeSwitcher />
    {:else if (user.user || {}).groups == 1}
      <AdminSwitcher />
    {/if}
  </div>
</main>

<script>
  import Header from "./Header.svelte";
  import EditOrder from '../customer/EditOrder.svelte';
  import NewOrder from '../customer/NewOrder.svelte';
  import EditAccount from '../customer/EditAccount.svelte';
  import OrderTable from '../customer/OrderTable.svelte';
  import OrderReview from '../customer/OrderReview.svelte';
  import NewRegion from '../admin/NewRegion.svelte';

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
  <Header />
  <div class="rounded-md shadow-md bg-white size flex-1 mt-6">
     <NewRegion />
  </div>
</main>

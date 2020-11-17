<script>
  import Header from "./Header.svelte";
  import EditOrder from '../customer/EditOrder.svelte';
  import NewOrder from '../customer/NewOrder.svelte';
  import EditAccount from '../customer/EditAccount.svelte';
  import OrderTable from '../customer/OrderTable.svelte';
  import OrderReview from '../customer/OrderReview.svelte';
  import NewRegion from '../admin/NewRegion.svelte';
  import RegionReview from '../admin/RegionReview.svelte';
  import EditRegion from '../admin/EditRegion.svelte';
  import NewRepresentative from '../admin/NewRepresentative.svelte';
  import RegionalRepresentative from '../admin/RegionalRepresentative.svelte';
  import ContractorTable from '../admin/ContractorTable.svelte';
  import ContractorReview from '../admin/ContractorReview.svelte';
  import NewContractor from '../representative/NewContractor.svelte';
  import ContractorTableRepresent from '../representative/ContractorTable.svelte';
  import ContractorReviewRepresent from '../representative/ContractorReview.svelte';
  import NewOrderRepresent from '../representative/NewOrder.svelte';
  import OrderReviewRepresent from '../representative/OrderReview.svelte';
  import OrderReport from '../representative/OrderReport.svelte';
  import EditReport from '../representative/EditReport.svelte';
  import EditAccountRepresent from '../representative/EditAccount.svelte';
  import AllOrders from '../representative/AllOrders.svelte';

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
     <AllOrders />
  </div>
</main>

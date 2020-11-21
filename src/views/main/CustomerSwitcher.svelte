<script>
  import { activeHeader } from "../../utils/stores/activeHeader";
  
  import NewOrder from "../customer/NewOrder.svelte";
  import OrderTable from "../customer/OrderTable.svelte";
  import EditAccount from "../customer/EditAccount.svelte";
  import EditOrder from "../customer/EditOrder.svelte";
  import OrderReview from "../customer/OrderReview.svelte";
</script>

{#if $activeHeader == 'Новая заявка'}
  <NewOrder />
{:else if $activeHeader == 'Таблица заявок'}
  <OrderTable />
{:else if $activeHeader == 'Редактирование аккаунта'}
  <EditAccount />
{/if}

<script>
  import { activeHeader } from "../../utils/stores/activeHeader";
  import NewContractor from "../representative/NewContractor.svelte";
  import ContractorTable from "../representative/ContractorTable.svelte";
  import ContractorReview from "../representative/ContractorReview.svelte";
  import OrderReview from "../representative/OrderReview.svelte";
  import OrderReport from "../representative/OrderReport.svelte";
  import EditReport from "../representative/EditReport.svelte";
  import EditAccount from "../representative/EditAccount.svelte";
  import AllOrders from "../representative/AllOrders.svelte";
  import NewOrder from "../representative/NewOrder.svelte";
</script>

{#if $activeHeader == 'Новая заявка'}
  <NewOrder />
{:else if $activeHeader == 'Проверка заявок'}
  <OrderReview />
{:else if $activeHeader == 'Новый исполнитель'}
  <NewContractor />
{:else if $activeHeader == 'Таблица исполнителей'}
  <ContractorTable />
{:else if $activeHeader == 'Настройка аккаунта'}
  <EditAccount />
{/if}

<script>
  import { activeHeader } from "../../utils/stores/activeHeader";
  import NewContractor from "../representative/NewContractor.svelte";
  import ContractorTable from "../representative/ContractorTable.svelte";
  import ContractorReview from "../representative/ContractorReview.svelte";
  import OrdersReview from "../representative/OrdersReview.svelte";
  import OrderReport from "../representative/OrderReport.svelte";
  import EditReport from "../representative/EditReport.svelte";
  import NewReport from "../representative/NewReport.svelte";
  import OrdersInProgress from "../representative/OrdersInProgress.svelte";
  import SingleReview from "../representative/SingleReview.svelte";
  import TakeOrder from "../representative/TakeOrder.svelte";
  import EditAccount from "../representative/EditAccount.svelte";
  import OrdersCompleted from "../representative/OrdersCompleted.svelte";
  import NewOrder from "../representative/NewOrder.svelte";
</script>

{#if $activeHeader == 'Новая заявка'}
  <NewOrder />
{:else if $activeHeader == 'Новый отчет'}
  <NewReport />
{:else if $activeHeader == 'Проверка заявок'}
  <OrdersReview />
{:else if $activeHeader == 'Просмотр заявки'}
  <SingleReview />
{:else if $activeHeader == 'Взять заявку'}
  <TakeOrder />
{:else if $activeHeader == 'Проверка отчета по заявке'}
  <OrderReport />
{:else if $activeHeader == 'Заявки в работе'}
  <OrdersInProgress />
{:else if $activeHeader == 'Исполненные заявки'}
  <OrdersCompleted />
{:else if $activeHeader == 'Новый исполнитель'}
  <NewContractor />
{:else if $activeHeader == 'Просмотр исполнителя'}
  <ContractorReview />
{:else if $activeHeader == 'Таблица исполнителей'}
  <ContractorTable />
{:else if $activeHeader == 'Настройка аккаунта'}
  <EditAccount />
{/if}

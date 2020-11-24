<script>
  import { activeHeader } from "../../utils/stores/activeHeader";

  import NewOrder from "../contractor/NewOrder.svelte";
  import TakeOrder from "../contractor/TakeOrder.svelte";
  import OrdersInProgress from "../contractor/OrdersInProgress.svelte";
  import OrdersInModeration from "../contractor/OrdersInModeration.svelte";
  import OrdersCompleted from "../contractor/OrdersCompleted.svelte";
  import EditAccount from "../contractor/EditAccount.svelte";
  import NewReport from "../contractor/NewReport.svelte";
  import OrderReview from "../contractor/OrderReview.svelte";
  import OrderPreview from "../contractor/OrderPreview.svelte";
  import EditReport from "../contractor/EditReport.svelte";
  import EditOrder from "../contractor/EditOrder.svelte";
</script>

{#if $activeHeader == 'Новая заявка'}
  <NewOrder />
{:else if $activeHeader == 'Взять заявку'}
  <TakeOrder />
{:else if $activeHeader == 'Просмотр заявки'}
  <OrderReview />
{:else if $activeHeader == 'Новый отчет'}
  <NewReport />
{:else if $activeHeader == 'Заявки в работе'}
  <OrdersInProgress />
{:else if $activeHeader == 'Заявки на модерации'}
  <OrdersInModeration />
{:else if $activeHeader == 'Исполненные заявки'}
  <OrdersCompleted />
{:else if $activeHeader == 'Настройка аккаунта'}
  <EditAccount />
{/if}

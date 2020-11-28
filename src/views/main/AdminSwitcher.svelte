<script>
  import { activeHeader } from "../../utils/stores/activeHeader";
  import NewRegion from "../admin/NewRegion.svelte";
  import RegionReview from "../admin/RegionReview.svelte";
  import EditRegion from "../admin/EditRegion.svelte";
  import NewRepresentative from "../admin/NewRepresentative.svelte";
  import RegionalRepresentative from "../admin/RegionalRepresentative.svelte";
  import RepresentativeTable from "../admin/RepresentativeTable.svelte";
  import ContractorReview from "../admin/ContractorReview.svelte";
  import ContractorTable from "../admin/ContractorTable.svelte";
  import RegionTable from "../admin/RegionTable.svelte";
</script>

{#if $activeHeader == 'Новый регион'}
  <NewRegion />
{:else if $activeHeader == 'Таблица регионов'}
  <RegionTable />
{:else if $activeHeader == 'Просмотр региона'}
  <RegionReview />
{:else if $activeHeader == 'Редактирование региона'}
  <EditRegion />
{:else if $activeHeader == 'Новый региональный представитель'}
  <NewRepresentative />
{:else if $activeHeader == 'Таблица региональный представитель'}
  <RepresentativeTable />
{:else if $activeHeader == 'Региональный представитель'}
  <RegionalRepresentative />
{:else if $activeHeader == 'Таблица исполнителей'}
  <ContractorTable />
{:else if $activeHeader == 'Просмотр исполнителя'}
  <ContractorReview />
{/if}

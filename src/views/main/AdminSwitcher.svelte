<script>
  import { activeHeader } from "../../utils/stores/activeHeader";
  import NewRegionAdmin from "../admin/NewRegion.svelte";
  import RegionReview from "../admin/RegionReview.svelte";
  import EditRegion from "../admin/EditRegion.svelte";
  import NewRepresentativeAdmin from "../admin/NewRepresentative.svelte";
  import RegionalRepresentative from "../admin/RegionalRepresentative.svelte";
  import ContractorTableAdmin from "../admin/ContractorTable.svelte";
  import ContractorReview from "../admin/ContractorReview.svelte";
  import RegionTableAdmin from "../admin/RegionTable.svelte";
</script>


{#if $activeHeader == 'Новый регион'}
  <NewRegionAdmin />
{:else if $activeHeader == 'Таблица регионов'}
  <RegionTableAdmin />
{:else if $activeHeader == 'Новый региональный исполнитель'}
  <NewRepresentativeAdmin />
{:else if $activeHeader == 'Таблица исполнителей'}
  <ContractorTableAdmin />
{/if}

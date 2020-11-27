<script>
    import { activeHeader } from "../../utils/stores/activeHeader";
    import { status } from "../../utils/stores/order";
    import { Snackbar } from "smelte";
    import DataZakaz from "../../components/common/DataZakaz.svelte";
    import UpdateReport from "../../components/common/UpdateReport.svelte";
  
    let showSnackbarSuccess = false,
      showSnackbarFailure = false;
  
    const gotoAddReport = () => {
      $activeHeader = "Новый отчет";
    };
  
    
  </script>
  
  <style>
  </style>
  
  <div class="py-6">
    <DataZakaz />
    {#if $status == 2}
      <div class="px-6 my-6 flex items-center text-blue-500">
        <span
          class="material-icons mr-2 cursor-pointer">add_circle_outline</span><span
          class="hover:underline cursor-pointer"
          on:click={gotoAddReport}>Добавить отчет</span>
      </div>
    {:else if $status == 3}
      <UpdateReport />
    {/if}
  </div>
  
  <Snackbar color="primary" top bind:value={showSnackbarSuccess} timeout={2000}>
    <div>Данные успешно загружены</div>
  </Snackbar>
  
  <Snackbar color="error" top bind:value={showSnackbarFailure} timeout={2000}>
    <div>Произошла ошибка. Попробуйте ещё раз позже</div>
  </Snackbar>
  
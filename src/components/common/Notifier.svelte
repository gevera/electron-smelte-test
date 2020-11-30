<script>
  import { Snackbar } from "smelte";
  export let showSuccess = false;
  export let showFailure = false;
  export let textSuccess = "Данные успешно обраотаны";
  export let textFailure = "Произошла ошибка. Попробуйте ещё раз чуть позже";
</script>

<Snackbar color="secondary" top bind:value={showSuccess} timeout={3000}>
  <div>{textSuccess}</div>
</Snackbar>

<Snackbar color="error" top bind:value={showFailure} timeout={3000}>
  <div>{textFailure}</div>
</Snackbar>

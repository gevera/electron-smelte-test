<script>
  import { TextField, Button } from "smelte";
</script>

<style>
  .new_password {
    width: 396px;
    height: 324px;
    background: #ffffff;
  }
</style>

<div class="new_password p-6 flex flex-col flex-between rounded-md shadow-md">
  <h5 class="text-center  my-2">Введите новый пароль </h5>
  <TextField label="Пароль" type="password" outlined color="secondary" />
  <TextField label="Подтвердите пароль" type="password" outlined color="secondary" />
  <Button block class="mt-0">Подтвердить</Button>
</div>

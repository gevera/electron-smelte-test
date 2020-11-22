<script>
  import { TextField, Button, Select, Checkbox } from "smelte";
  import { regions } from "../../utils/stores/regions";
  import { viewStates } from "../../utils/stores/viewStates";

  let region = '';
  
  // $: console.log($regions);
  $: items = [...$regions].map((r) => ({ value: r.id, text: r.name }));
  
  const gotoLogin = () => {
    $viewStates = "login";
  }
</script>

<style>
  .register {
    height: 768px;
    width: 400px;
    background: #ffffff;
  }
</style>

<div class="register p-4 pt-2 rounded-md shadow-md">
  <h6 class="text-center">Регистрация</h6>
  <TextField label="Имя" outlined color="secondary" />
  <TextField label="Фамилия" outlined color="secondary" />
  <TextField label="Отчество" outlined color="secondary" />
  <TextField label="Эл. Почта" type="email" outlined color="secondary" />
  <TextField label="Телефон" outlined color="secondary" />
  <TextField label="Пароль" type="password" outlined color="secondary" />
  <TextField
    label="Подтвердите пароль"
    type="password"
    outlined
    color="secondary" />
  <Select bind:value={region} outlined autocomplete label="Регион" {items} />

  <Button block class="mt-0">Войти</Button>
  <p class="text-xs mt-2">
    Нажимая кнопку "Войти" вы подтверждаете своё согласие с
    <a href="/" class="text-primary-500 underline">офертой</a> Если у вас уже есть аккаунт перейдите
    <span on:click={gotoLogin} class="text-primary-500 underline cursor-pointer">по ссылке</span>
  </p>
</div>

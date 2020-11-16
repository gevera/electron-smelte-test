<script>
  import { TextField, Button, Select, Checkbox } from "smelte";

  let value1 = "";
  let value2 = "";
  let value3 = "";
  let value4 = "";

  let showList = false;

  const items = [
    { value: 1, text: "One" },
    { value: 2, text: "Two" },
    { value: 3, text: "Three" },
    { value: 4, text: "Four" },
  ];

  let selectedItems = [];

  function toggle(i) {
    return (v) =>
      v.detail
        ? selectedItems.push(i)
        : (selectedItems = selectedItems.filter((si) => si !== i));
  }

  $: selectedLabel = selectedItems.map((i) => i.text).join(", ");

  const label = "A select";
</script>

<style>
  .register {
    height: 746px;
    width: 396px;
    background: #ffffff;
  }
</style>

<div class="register p-4 pt-2 rounded-md shadow-md">
  <h6 class="text-center">Регистрация</h6>
  <Select bind:value={value3} outlined autocomplete label="Регион" {items} />
  <TextField label="Имя" outlined color="secondary" />
  <TextField label="Фамилия" outlined color="secondary" />
  <TextField label="Отчество" outlined color="secondary" />
  <TextField label="Эл. Почта" type="email" outlined color="secondary" />
  <TextField label="Телефон" outlined color="secondary" />
  <TextField label="Пароль" type="password" outlined color="secondary" />
  <TextField label="Подтвердите пароль" type="password" outlined color="secondary" />

  <Button block class="mt-0">Войти</Button>
</div>
<p class="text-xs">
  Нажимая кнопку "Войти" вы подтверждаете своё согласие с
  <a href="/" class="text-primary-500 underline">офертой</a>
</p>

<script>
  import { TextField, Button } from "smelte";
  import { login } from "../../utils/helpers/login";
  import { viewStates } from "../../utils/stores/viewStates";

  let data = {
    username: "",
    password: "",
  };

  const loginAttempt = async () => {
    const { success } = await login(data);
    if (success) {
      data.username = "";
      data.password = "";
      $viewStates = "active";
    }
  };

  const gotoRegister = () => {
    $viewStates = "register";
  };
</script>

<style>
  .login {
    height: 580px;
    width: 944px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .side {
    height: 580px;
    width: 472px;
    background: #ffffff;
    display: flex;
    /* align-items: center; */
    justify-content: flex-end;
  }
  .left {
    width: 388px;
    height: 348px;
  }
  .left > h4 {
    color: #ff8b61;
  }

  .right {
    width: 372px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
  }
  .right > h4 {
    color: #2c3748;
  }
  .right > p {
    margin-bottom: 17px;
  }
</style>

<div class="login">
  <div class="side">
    <div class="left justify-end self-center p-6">
      <h4 class="mb-2">Заголовок</h4>
      <p class="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quia
        maiores dignissimos aperiam aspernatur impedit ratione hic, corrupti
        mollitia? Facilis nesciunt libero maxime quo repudiandae accusamus modi
        debitis culpa? Repudiandae. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Adipisci quia maiores dignissimos aperiam aspernatur
        impedit ratione hic, corrupti mollitia? Facilis nesciunt libero maxime
        quo repudiandae accusamus modi debitis culpa? Repudiandae.
      </p>
    </div>
  </div>
  <div class="side">
    <div class="right">
      <h4 class="text-center mb-1 text-secondary-500">Вход</h4>
      <TextField
        label="Логин"
        outlined
        color="secondary"
        bind:value={data.username}
        />
      <TextField
        label="Пароль"
        type="password"
        outlined
        color="secondary"
        bind:value={data.password} />
      <p class="text-sm">
        Нет аккаунта? Создайте его
        <span
          class="text-primary-500 underline cursor-pointer"
          on:click={gotoRegister}>здесь</span>
      </p>
      <Button block color="primary" on:click={loginAttempt}>Войти</Button>
    </div>
  </div>
</div>

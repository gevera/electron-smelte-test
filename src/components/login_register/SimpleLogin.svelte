<script>
  import { TextField, Button, Snackbar } from "smelte";
  import { login } from "../../utils/helpers/login";
  import { viewStates } from "../../utils/stores/viewStates";
  import { user } from "../../utils/stores/user";
import Notifier from "../common/Notifier.svelte";

  let data = {
    username: "",
    password: "",
  };

  let showFailure = false;

  const loginAttempt = async () => {

    const { success } = await login(data);
    if (success) {
      data.username = "";
      data.password = "";
      const updatePassword =
        $user.user.groups != 4 && $user.user.first_password == true;
      console.log(updatePassword);
      if (updatePassword) {
        localStorage.setItem("update_password", true);
        viewStates.set("change password");
      } else {
        $viewStates = "active";
      }
    } else {
      showFailure = true;
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

<form class="login" on:submit|preventDefault={loginAttempt}>
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
        type="email"
        required
        bind:value={data.username} />
      <TextField
        label="Пароль"
        type="password"
        outlined
        required
        color="secondary"
        bind:value={data.password} />
      <p class="text-sm">
        Нет аккаунта? Создайте его
        <span
          class="text-primary-500 underline cursor-pointer"
          on:click={gotoRegister}>здесь</span>
      </p>
        <Button block color="primary">Войти</Button>
    </div>
  </div>
</form>

<Notifier {showFailure} textFailure="Введите верный пароль или логин" />
<script>
  import { Button, Dialog, TextField } from "smelte";
  import DataZakaz from "../../components/common/DataZakaz.svelte";
  import Heading from "../../components/common/Heading.svelte";
  import Person from "../../components/common/Person.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import { orderID } from "../../utils/stores/order";
  import { token } from "../../utils/stores/token";
  import { tempConfig } from "../../utils/stores/tempConfigs";
import Notifier from "../../components/common/Notifier.svelte";

  // TODO fix status not changing
  // get data of customer & get data of executor
  
  let confirmStop = false,
    rejectReason = "",
    showReject = true,
    showSuccess = false,
    showFailure = false;
  const sendReject = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.orderDecline}${$orderID}/`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `token ${$token}`,
        },
        body: JSON.stringify({ description: rejectReason }),
      }
    );
    if (response.ok) {
      console.log(response);
      confirmStop = false;
      showReject = false;
      showSuccess = true;
    } else {
      showFailure = true;
    }
  };
</script>

<div class="h-full w-full py-6 flex flex-col justify-between">
  <div class="">
    <div class="flex justify-between px-6">
      <h5 class="text-dark-500 px-6 mb-4"># {$orderID}</h5>
      {#if showReject}
        <Button
          text
          icon="highlight_off"
          add="text-primary-500"
          iconClass="mr-6"
          on:click={() => (confirmStop = !confirmStop)}>
          Отклонить
        </Button>
      {/if}
    </div>
    <div class="flex px-6 justify-around">
      <div class="flex-grow mr-4">
        <Heading heading="Заказчик" />
        <Person />
      </div>
      <div class="flex-grow ml-4">
        <Heading heading="Исполнитель" />
        <Person />
      </div>
    </div>
    <Heading heading="Данные" addClass="my-2 mx-4" />
    <DataZakaz />

    <div class="flex items-center justify-between mt-2 px-6">
      <Heading heading="Отчет" addClass="mr-4 flex-grow" />
      <Button
        text
        icon="edit"
        add="text-primary-500"
        iconClass="mr-6"
        on:click={() => (confirmStop = !confirmStop)}>
        Редактировать
      </Button>
    </div>
    <div class="flex px-6 justify-between">
      <img
        src="./images/avatar.jpeg"
        alt="photo_report"
        class="w-32 h-32 mr-4" />
      <p class="flex-grow">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi esse
        perferendis laudantium quos, nobis ex rerum at laborum est provident
        voluptates fuga dolorum! Exercitationem, aliquid incidunt laudantium
        reprehenderit odit deserunt.
      </p>
    </div>
  </div>
  <!-- Fix to 'Prinyati' add function to accept review PUT empty body -->
  <SaveClose wordPositive="Принять"/>
</div>

<Dialog bind:value={confirmStop}>
  <h5 slot="title" class="mx-32 text-dark-500">Причина отказа</h5>
  <TextField
    rows="5"
    outlined
    textarea
    bind:value={rejectReason}
    color="secondary"
    label="Сообщение" />
  <div slot="actions">
    <Button outlined color="dark" on:click={() => (confirmStop = false)}>
      Отмена
    </Button>
    <Button on:click={sendReject}>Отправить</Button>
  </div>
</Dialog>

<Notifier {showSuccess} {showFailure} textSuccess="Отчет был успешно отклонен"/>
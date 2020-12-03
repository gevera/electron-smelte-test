<script>
  import { Button, Dialog, TextField } from "smelte";
  import DataZakaz from "../../components/common/DataZakaz.svelte";
  import Heading from "../../components/common/Heading.svelte";
  import Person from "../../components/common/Person.svelte";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import { customer, orderID } from "../../utils/stores/order";
  import { token } from "../../utils/stores/token";
  import { executorID } from "../../utils/stores/order";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import Notifier from "../../components/common/Notifier.svelte";
  import { onMount } from "svelte";

  // TODO fix status not changing

  let confirmStop = false,
    rejectReason = "",
    showReject = true,
    showSuccess = false,
    showFailure = false,
    exec = {},
    report = {};
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

  const acceptReview = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.orderAccept}${$orderID}/`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `token ${$token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Prinyat", data);
    }
  };
  const getExecutor = async (id) => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.executor}${id}/`,
      {
        headers: {
          Authorization: `token ${$token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      exec = data;
      console.log("Executor ===>>> ", data);
    }
  };

  const getReport = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.orderReviews}?order=${$orderID}`,
      {
        headers: {
          Authorization: `token ${$token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      report = data[0];
      console.log("Report ===>>> ", data[0]);
      return report;
    }
  };

  onMount(async () => {
    await getExecutor($executorID);
  });
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
        <Person customer={$customer} />
      </div>
      <div class="flex-grow ml-4">
        <Heading heading="Исполнитель" />
        <Person rp={exec} />
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
    {#await getReport() then report}
      <div class="flex px-6 justify-between">
        {#each report.images as { images }}
          <img src={images} alt="photo_report" class="w-32 h-32 mr-4" />
        {/each}
        {#each report.scans as { scans }}
          <img src={scans} alt="scans" class="w-32 h-32 mr-4" />
        {/each}
      </div>
      <p class="px-6">{report.description}</p>
    {/await}
  </div>
  <!-- Fix to 'Prinyati' add function to accept review PUT empty body -->
  <SaveClose wordPositive="Принять" positive={acceptReview} />
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

<Notifier
  {showSuccess}
  {showFailure}
  textSuccess="Отчет был успешно отклонен" />

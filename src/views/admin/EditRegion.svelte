<script>
  import { TextField, Button, Snackbar } from "smelte";
  import Heading from "../../components/common/Heading.svelte";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { orderID } from "../../utils/stores/order";
  import { token } from "../../utils/stores/token";
  import SaveClose from "../../components/common/SaveClose.svelte";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { onMount } from "svelte";
import Notifier from "../../components/common/Notifier.svelte";
  let region = {
      name: "",
      order_site_price: "",
      order_rp_price: 1,
      order_customer_price: "",
      order_executor_price: "",
      rate_rp_customer: "",
      rate_rp_executor: "",
      rate_rp_site: "",
      rate_first_rp_site: "",
      rate_first_rp_customer: "",
      executor_rate_site: "",
      executor_rate_customer: "",
      executor_rate_executor: "",
      commission_site: "",
      commission_customer: "",
      commission_executor: "",
    },
    showFailure = false,
    showSuccess = false;

  const getRegion = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.region}${$orderID}/`,
      {
        headers: {
          Authorization: `token ${$token}`,
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    return data;
  };
  onMount(async () => {
    const regionData = await getRegion();
    console.log(regionData);
    region = { ...regionData };
    showFailure = false;
    showSuccess = false;
  });
  const updateRegion = async () => {
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.region}${$orderID}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${$token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...region }),
      }
    );
    if (response.ok) {
      showSuccess = true;
    } else {
      showFailure = true;
    }
  };
</script>

<div class="w-full h-full p-8 flex flex-col justify-between">
  <div class="">
    <div>
      <Heading heading="Категория 1" />
      <TextField
        label="Название"
        outlined
        color="secondary"
        prepend="public"
        bind:value={region.name} />
    </div>
    <div>
      <Heading heading="Категория 2" />
    </div>
    <TextField
      label="Стоимости заявки при оформлении с сайта"
      bind:value={region.order_site_price}
      outlined
      color="secondary" />
    <TextField
      label="Стоимости заявки при оформлении заказчиком"
      bind:value={region.order_customer_price}
      outlined
      color="secondary" />
    <TextField
      label="Стоимости заявки при оформлении исполнителем"
      bind:value={region.order_executor_price}
      outlined
      color="secondary" />
    <TextField
      label="Ставка РП при оформлении заявки с сайта"
      bind:value={region.rate_rp_site}
      outlined
      color="secondary" />
    <TextField
      label="Ставка РП при оформлении заявки заказчиком"
      bind:value={region.rate_rp_customer}
      outlined
      color="secondary" />
    <TextField
      label="Ставка РП при оформлении заявки исполнителем"
      bind:value={region.rate_rp_executor}
      outlined
      color="secondary" />
    <TextField
      label="Ставка первого РП при оформлении заявки с сайта"
      bind:value={region.rate_first_rp_site}
      outlined
      color="secondary" />
    <TextField
      label="Ставка первого РП при оформлении заявки заказчиком"
      bind:value={region.rate_first_rp_customer}
      outlined
      color="secondary" />
    <TextField
      label="Ставка исполнителя при оформлении заявки с сайта"
      bind:value={region.executor_rate_site}
      outlined
      color="secondary" />
    <TextField
      label="Ставка исполнителя при оформлении заявки заказчиком"
      bind:value={region.executor_rate_customer}
      outlined
      color="secondary" />
    <TextField
      label="Ставка исполнителя при оформлении заявки исполнителем"
      bind:value={region.executor_rate_executor}
      outlined
      color="secondary" />
    <TextField
      label="Комиссия системы при оформлении заявки с сайта"
      bind:value={region.commission_site}
      outlined
      color="secondary" />
    <TextField
      label="Комиссия системы при оформлении заявки заказчиком"
      bind:value={region.commission_customer}
      outlined
      color="secondary" />
    <TextField
      label="Комиссия системы при оформлении заявки исполнителем"
      bind:value={region.commission_executor}
      outlined
      color="secondary" />
  </div>
  <SaveClose
    positive={updateRegion}
    negative={() => ($activeHeader = 'Таблица регионов')} />
</div>

<Notifier {showSuccess} {showFailure} textSuccess="Данные успешно обновлены" />
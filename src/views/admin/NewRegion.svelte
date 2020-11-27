<script>
  import { TextField, Button } from "smelte";
  import Heading from "../../components/common/Heading.svelte";
  import { token } from "../../utils/stores/token";
  import { tempConfig } from "../../utils/stores/tempConfigs";
  import { activeHeader } from "../../utils/stores/activeHeader";
  // TODO trouble with order_rp_price hardcode for now
  let name = "",
    order_site_price = "",
    order_rp_price = 1,
    order_customer_price = "",
    order_executor_price = "",
    rate_rp_customer = "",
    rate_rp_executor = "",
    rate_rp_site = "",
    rate_first_rp_site = "",
    rate_first_rp_customer = "",
    executor_rate_site = "",
    executor_rate_customer = "",
    executor_rate_executor = "",
    commission_site = "",
    commission_customer = "",
    commission_executor = "";

  const createRegion = async () => {
    const newRegion = {
      name,
      order_site_price,
      order_rp_price,
      order_customer_price,
      order_executor_price,
      rate_rp_customer,
      rate_rp_executor,
      rate_rp_site,
      rate_first_rp_site,
      rate_first_rp_customer,
      executor_rate_site,
      executor_rate_customer,
      executor_rate_executor,
      commission_site,
      commission_customer,
      commission_executor,
    };
    const response = await fetch(
      `${$tempConfig.server_URL}${$tempConfig.region}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `token ${$token}`,
        },
        body: JSON.stringify(newRegion),
      }
    );
    if (response.ok) {
      $activeHeader = "Таблица регионов";
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
        bind:value={name} />
    </div>
    <div>
      <Heading heading="Категория 2" />
    </div>
    <TextField
      label="Стоимости заявки при оформлении с сайта"
      bind:value={order_site_price}
      outlined
      color="secondary" />
    <TextField
      label="Стоимости заявки при оформлении заказчиком"
      bind:value={order_customer_price}
      outlined
      color="secondary" />
    <TextField
      label="Стоимости заявки при оформлении исполнителем"
      bind:value={order_executor_price}
      outlined
      color="secondary" />
    <TextField
      label="Ставка РП при оформлении заявки с сайта"
      bind:value={rate_rp_site}
      outlined
      color="secondary" />
    <TextField
      label="Ставка РП при оформлении заявки заказчиком"
      bind:value={rate_rp_customer}
      outlined
      color="secondary" />
    <TextField
      label="Ставка РП при оформлении заявки исполнителем"
      bind:value={rate_rp_executor}
      outlined
      color="secondary" />
    <TextField
      label="Ставка первого РП при оформлении заявки с сайта"
      bind:value={rate_first_rp_site}
      outlined
      color="secondary" />
    <TextField
      label="Ставка первого РП при оформлении заявки заказчиком"
      bind:value={rate_first_rp_customer}
      outlined
      color="secondary" />
    <TextField
      label="Ставка исполнителя при оформлении заявки с сайта"
      bind:value={executor_rate_site}
      outlined
      color="secondary" />
    <TextField
      label="Ставка исполнителя при оформлении заявки заказчиком"
      bind:value={executor_rate_customer}
      outlined
      color="secondary" />
    <TextField
      label="Ставка исполнителя при оформлении заявки исполнителем"
      bind:value={executor_rate_executor}
      outlined
      color="secondary" />
    <TextField
      label="Комиссия системы при оформлении заявки с сайта"
      bind:value={commission_site}
      outlined
      color="secondary" />
    <TextField
      label="Комиссия системы при оформлении заявки заказчиком"
      bind:value={commission_customer}
      outlined
      color="secondary" />
    <TextField
      label="Комиссия системы при оформлении заявки исполнителем"
      bind:value={commission_executor}
      outlined
      color="secondary" />
  </div>
  <div class="flex justify-end">
    <Button on:click={createRegion}>Создать</Button>
  </div>
</div>

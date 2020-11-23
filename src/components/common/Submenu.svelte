<script>
  import { Menu, Button } from "smelte";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { orderID } from "../../utils/stores/order";
  export let id;
  let open = false,
    selected = "";
  const itemsData = [
    {
      value: 1,
      text: "Просмотр",
    },
    {
      value: 2,
      text: "Редактирование",
    },
  ];

  $: if (selected == 1) {
    $activeHeader = 'Просмотр заявки';
    $orderID = id;
  } else if (selected == 2) {
    $activeHeader = 'Редактирование заявки';
    $orderID = id;
  }

</script>

<Menu bind:open items={itemsData} bind:value={selected}>
  <div slot="activator">
    <Button text light flat icon="more_vert" on:click={() => (open = !open)} />
  </div>
</Menu>

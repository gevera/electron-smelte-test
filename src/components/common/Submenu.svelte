<script>
  import { Menu, Button, Dialog } from "smelte";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { orderID } from "../../utils/stores/order";
  export let id;
  let open = false,
    selected = "";
  export let icon = "more_vert";
  export let itemsData = [
    {
      value: 1,
      text: "Просмотр",
      action: (id) => {
        $activeHeader = "Просмотр заявки";
        $orderID = id;
      },
    },
    {
      value: 2,
      text: "Редактирование",
      action: (id) => {
        $activeHeader = "Редактирование заявки";
        $orderID = id;
      },
    },
  ];

  $: if (selected == 1) {
    itemsData[0].action(id);
  } else if (selected == 2) {
    itemsData[1].action(id);
    console.log(itemsData);
  }
</script>

<Menu bind:open items={itemsData} bind:value={selected}>
  <div slot="activator">
    <Button
      text
      light
      flat
      color="dark"
      {icon}
      on:click={() => (open = !open)} />
  </div>
</Menu>
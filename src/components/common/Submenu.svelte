<script>
  import { Menu, Button } from "smelte";
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
</script>

<Menu bind:open items={itemsData} bind:value={selected}>
  <div slot="activator">
    <Button text light flat icon="more_vert" on:click={() => (open = !open)} />
  </div>
</Menu>

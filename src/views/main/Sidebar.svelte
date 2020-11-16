<script>
  import { Button } from "smelte";
  export let navMenu = [
    {
      id: 1,
      text: "Новая заявка",
      active: true,
      icon: "add_circle_outline",
    },
    {
      id: 2,
      text: "Таблица заявок",
      active: false,
      icon: "list",
    },
  ];

  const setActive = (id) => {
    navMenu = navMenu.map((i) =>
      i.id == id ? { ...i, active: true } : { ...i, active: false }
    );
  };
</script>

<style>
  .sidebar {
    background: #2c373b;
    color: #ffffff;
    width: 250px !important;
  }
  .topper {
    height: 50px;
  }
</style>

<div class="sidebar p-2 bg-dark-500 h-screen">
  <div class="topper border-b-2 border-gray-300 m-2 flex">
    <Button text flat light color="bg-gray-300" icon="arrow_back_ios" add="px-0"/>
    <Button text flat light color="bg-gray-300" icon="arrow_forward_ios" add="px-0"/>
  </div>
  <div class="p-2 pt-4">
    {#each navMenu as item (item.id)}
      <Button
        block
        text
        add={item.active ? 'text-primary-500' : ''}
        icon={item.icon}
        iconClass="mr-2"
        on:click={() => setActive(item.id)}>
        {item.text}
      </Button>
    {/each}
  </div>
</div>

<script>
  import { Button, List, ListItem, NavigationDrawer } from "smelte";
  let navMenu = [
    {
      text: "test 1",
    },
    {
      text: "test 2",
    },
  ];
</script>

<style>
  .sidebar {
    background: #2c373b;
    color: #ffffff;
    width: 250px;
  }
</style>

<div class="sidebar p-2">
  {#each navMenu as item}
    <div class="p-2">
      <Button text block flat icon="add_circle_outline" iconClass="mr-2">
        {item.text}
      </Button>
    </div>
  {/each}
</div>

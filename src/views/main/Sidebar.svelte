<script>
  import { Button } from "smelte";
  // import { user } from "../../utils/stores/user";
  import { sidemenu } from "../../utils/stores/sidemenu";
  import { activeHeader } from "../../utils/stores/activeHeader";
  import { onMount } from "svelte";

  export let user;

  $: usergroup = user.user.groups;
  $: navMenu = $sidemenu.find((sm) => usergroup == sm.id).menu;

  onMount(() => {
    const active = navMenu.filter((i) => i.active)[0];
    activeHeader.set(active.text);
  });

  const setActive = (id) => {
    navMenu = navMenu.map((i) => {
      if (i.id == id) {
        activeHeader.set(i.text);
        return { ...i, active: true };
      } else {
        return { ...i, active: false };
      }
    });
  };

  $: console.log($sidemenu);
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

<div class="sidebar p-2 bg-dark-500 h-full">
  <div class="topper border-b-2 border-gray-300 m-2 flex">
    <Button
      text
      flat
      light
      color="bg-gray-300"
      icon="arrow_back_ios"
      add="px-0" />
    <Button
      text
      flat
      light
      color="bg-gray-300"
      icon="arrow_forward_ios"
      add="px-0" />
  </div>
  <div class="p-2 pt-4">
    {#if navMenu}
      {#each navMenu as item (item.id)}
        <Button
          block
          text
          class="text-left"
          add={item.active ? 'text-primary-500' : ''}
          icon={item.icon}
          iconClass="mr-2"
          on:click={() => setActive(item.id)}>
          {item.text}
        </Button>
      {/each}
    {/if}
  </div>
</div>

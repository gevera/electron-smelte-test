<script>
  export let headers = [
    { title: "Title", addClass: "bg-red-200" },
    { title: "Author", addClass: "" },
    { title: "Views", addClass: "" },
  ];
  export let dataList = [
    {
      title: "Uno",
      author: "guru ripoche",
      views: 300,
    },
  ];

  export let addClass = "w-full";
</script>

<table class={`table-auto ${addClass}`}>
  <thead>
    <tr>
      {#each headers as header}
        <th
          class={`font-medium text-dark-500 px-4 py-2 mx-2${header.addClass}`}>
          {header.title}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each dataList as data, i}
      <tr class:bg-gray-100={i % 2}>
        {#each Object.values(data) as item}
          <td class="border p-2">
            <slot>{item}</slot>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

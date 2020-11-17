<script>
  import { DataTable, Select, Button } from "smelte";
  let open = true;
  let value1 = "";

  const items = [
    {
      value: 1,
      text: "Prosmotr",
    },
    {
      value: 2,
      text: "Redactirovanie",
    },
  ];
  let columns = [
    {
      field: "name",
      label: "Имя",
      sortable: true,
      editable: false,
      class: "text-base",
    },
    {
      field: "telephone",
      label: "Телефон",
      class: "text-primary-500 text-base",
      sortable: true,
      editable: false,
    },
    {
      label: "Регион",
      field: "region",
      class: "text-base",
      sortable: true,
      editable: false,
      iconAfter: true,
    },
    {
      label: "-",
      editable: false,
      sortable: false,
      value: (v) => `
                      <Menu bind:open {items} bind:value={selected}>
                          <div slot="activator">
                          <Button text light flat icon="more_vert on:click={() => console.log('Clicked' + v)}">
                              <span class="material-icons text-dark-500">visibility</span>
                          </Button>
                      </div>
                      </Menu>`,
    },
  ];
  let data = [
    { name: "test 1", telephone: "4353453", region: "crimea" },
    { name: "test 2", telephone: "4776634785", region: "moscow" },
    { name: "test 3", telephone: "65565656", region: "altai" },
    {
      name: "test 4",
      telephone: "99596959659",
      quant: 3454,
      region: "vladivostok",
    },
  ];
</script>

<div class="w-full h-full ">
  <div class="mt-4">
    <DataTable class="w-full text-base" {columns} {data} />
  </div>
</div>

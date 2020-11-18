<script>
    import { DataTable, Select } from "smelte";
    let open = true;
    let value1 = "";
  
    const items = [
      {
        value: 1,
        text: "Ufa",
      },
      {
        value: 2,
        text: "Sterlitamak",
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
                                <span class="material-icons text-primary-500">more_vert</span>
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
        region: "vladivostok",
      },
    ];
  </script>
  
  <div class="w-full h-full py-6">
    <div class="flex px-6 items-center">
      <p class="text-dark-500 mr-2">Город</p>
      <Select
        class="w-auto  p-2 border-none"
        outlined
        {items}
        on:change={(v) => (value1 = v.detail)} />
    </div>
    <div class="mt-4">
      <DataTable class="w-full text-base" {columns} {data} />
    </div>
  </div>
  
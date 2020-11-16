<script>
    import {Switch, DataTable, Button, Menu } from 'smelte';
    let data =[];
    let loading = false;
    // async function getData() {
    //     if (typeof window === "undefined") return;
    //     loading = true;
    //     const res = await fetch("./data.json");
    //     const body = await res.json();

    //     data = body;
    // }

    // getData();
    
    const sampleData = [
        { 
            id: 1,
            name: 'Vasya Pupkin',
            telephone: '+85967495764',
            address: 'some street 456'
        },
        {   id: 2,
            name: 'Prokofieva Naliya',
            telephone: '+333555666',
            address: 'Long ass address 45'
        }
    ]

    data = sampleData;

    let open = false;
    let selected = "";

    const items = [
        {
            value: 1,
            text: 'Prosmotr'
        },
        {
            value: 2,
            text: 'Redactirovanie'
        }
    ]

</script>
<div class="flex flex-col justify-between py-6">
    <div class="px-6 flex items-center mb-4">
        <p class="mr-4 text-dark-500">Исполненные</p>
        <div class="pt-1">
            <Switch />
        </div>
    </div>
    <div>
        <DataTable
        {data}
        {loading}
        class="w-full h-full"
        on:update={
            ({detail}) => {
                const { column, item, value} = detail;
                const index = data.findIndex(i => i.id === item.id);
                data[index][column.field] = value;
            }
        }
        columns={
            [
                {
                    label: 'Имя',
                    field: 'name',
                    class:"",
                    editable: false
                },
                {
                    label: 'Телефон',
                    class:"md:w-18",
                    add:"md:w-30",
                    field: 'telephone',
                    editable: false
                },
                {
                    label: 'Адрес',
                    add: 'text-left',
                    field: 'address',
                    editable: false,
                    iconAfter: true
                },
                {
                    label: '-',
                    class: 'md:w-8',
                    sortable: false,
                    editable: false,
                    value: () => `
                                <Menu bind:open {items} bind:value={selected}>
                                    <div slot="activator">
                                  <Button text light flat icon="more_vert on:click={() => open = !open}">
                                      <span class="material-icons text-primary-500">more_vert</span>
                                  </Button>
                                </div>
                                </Menu>`
                },

            ]
        }
        />
    </div>
</div>
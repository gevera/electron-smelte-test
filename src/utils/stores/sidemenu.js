import { writable } from 'svelte/store';

export const sidemenu = writable([
    {
        id: 1,
        menu: [
            {
                id: 1,
                text: "Новый регион",
                active: true,
                icon: "add_circle_outline",
            },
            {
                id: 2,
                text: "Таблица регионов",
                active: false,
                icon: "list",
            },
            {
                id: 3,
                text: "Новый региональный исполнитель",
                active: false,
                icon: "person_outline",
            },
            {
                id: 4,
                text: "Таблица исполнителей",
                active: false,
                icon: "people",
            },
        ]
    },
    {
        id: 2,
        menu: [
            {
                id: 1,
                text: "Новая заявка",
                active: true,
                icon: "add_circle_outline",
            },
            {
                id: 2,
                text: "Проверка заявок",
                active: false,
                icon: "list",
            },
            {
                id: 3,
                text: "Взять заявку",
                active: false,
                icon: "layers",
            },
            {
                id: 4,
                text: "Исполненные заявки",
                active: false,
                icon: "done_outline",
            },
            {
                id: 5,
                text: "Новый исполнитель",
                active: false,
                icon: "perm_identity",
            },
            {
                id: 6,
                text: "Таблица исполнителей",
                active: false,
                icon: "people",
            },
            {
                id: 7,
                text: "Заказчики",
                active: false,
                icon: "record_voice_over",
            },
        ]
    },
    {
        id: 3,
        menu: [
            {
                id: 1,
                text: "Новая заявка",
                active: true,
                icon: "add_circle_outline",
            },
            {
                id: 2,
                text: "Взять заявку",
                active: false,
                icon: "layers",
            },
            {
                id: 3,
                text: "Заявки в работе",
                active: false,
                icon: "work_outline",
            },
            {
                id: 4,
                text: "Заявки на модерации",
                active: false,
                icon: "find_in_page",
            },
            {
                id: 5,
                text: "Исполненные заявки",
                active: false,
                icon: "done_outline",
            },
        ]
    },
    {
        id: 4,
        menu: [
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
            }
        ]
    }
])
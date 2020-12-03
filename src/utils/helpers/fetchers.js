import { get } from "svelte/store";
import { tempConfig } from "../stores/tempConfigs";
import { notification } from "../stores/notification";

const URL = get(tempConfig);

export const fetchOrder = async (id, token) => {
  const response = await fetch(`${URL.server_URL}${URL.orderCreate}${id}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchAllOrders = async (token) => {
  const response = await fetch(`${URL.server_URL}${URL.orderList}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchExecutor = async (id, token) => {
  const response = await fetch(`${URL.server_URL}${URL.executor}${id}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchAllExecutors = async (token) => {
  const response = await fetch(`${URL.server_URL}${URL.executor}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchRP = async (id, token) => {
  const response = await fetch(`${URL.server_URL}${URL.rp}${id}/`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchAllRPs = async (token) => {
  const response = await fetch(`${URL.server_URL}${URL.rp}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchRegion = async (id, token) => {
  const response = await fetch(`${URL.server_URL}${URL.region}${id}/`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchAllRegions = async (token) => {
  const response = await fetch(`${URL.server_URL}${URL.region}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const data = await response.json();
  return data;
};


export const fetchNotification = async (token) => {
    setInterval(async () => {
        const response = await fetch(`${URL.server_URL}${URL.notification}`, {
            headers: {
              Authorization: `token ${token}`,
            },
          });
          const data = await response.json();
          notification.update(n => data);
          return data;
    }, 4000)
}
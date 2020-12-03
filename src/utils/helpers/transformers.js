export const getOrderStatus = (s) => {
  if (s == 2) {
    return "В работе";
  } else if (s == 3) {
    return "Ожидает проверки";
  } else if (s == 4) {
    return "Исполненно";
  } else {
    return "Ищет исполнителя";
  }
};

export const getName = (arr, comp) => arr.filter((v) => v.id == comp)[0].name;

export const filteredData = (arr, s) => arr.filter((o) => o.status == s);

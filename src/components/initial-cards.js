const moscowImage = new URL("../images/Moscow.jpg", import.meta.url);
const nNovgorodImage = new URL("../images/n_novgorod.jpg", import.meta.url);
const novosibirskImage = new URL("../images/novosibirsk.jpg", import.meta.url);
const kazanKremlinImage = new URL(
  "../images/Kazan_Kremlin.jpg",
  import.meta.url
);
const stPetersburgImage = new URL(
  "../images/st_petersburg.jpg",
  import.meta.url
);
const ekaterinburgImage = new URL(
  "../images/ekaterinburg.jpg",
  import.meta.url
);

export const initialCards = [
  {
    name: "Москва",
    link: moscowImage,
  },
  {
    name: "Нижний Новгород",
    link: nNovgorodImage,
  },
  {
    name: "Новосибирск",
    link: novosibirskImage,
  },
  {
    name: "Казань",
    link: kazanKremlinImage,
  },
  {
    name: "Санкт-Петербург",
    link: stPetersburgImage,
  },
  {
    name: "Екатеринбург",
    link: ekaterinburgImage,
  },
];

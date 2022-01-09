import axios from "axios";
export async function fetchDataFromApi(url) {
  const res = await axios(url);
console.log(res);
  // if (!res.errors)
  //   return res.data.data.map(({ attributes, id }) => ({
  //     id,
  //     head: {
  //       en: attributes.titles.en || "N/A",
  //       en_jp: attributes.titles.en_jp || "N/A",
  //       ja_jp: attributes.titles.ja_jp || "N/A",
  //     },
  //     episode: attributes.episodeCount,
  //     seaFin: 3,
  //     status: attributes.status,
  //     endDate: attributes.endDate,
  //     favoritesCount: attributes.favoritesCount,
  //     type: attributes.showType,
  //     posterImage: attributes.posterImage,
  //   }));
  if (!res.errors) return res.data;
  // err ==! null === true restuen 
}

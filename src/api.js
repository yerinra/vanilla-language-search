const API_ENDPOINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  const data = await fetch(url);
  return await data.json();
};

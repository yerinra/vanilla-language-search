const API_ENDPOINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

export const fetchResult = async (keyword) => {
  const res = await fetch(API_ENDPOINT + `/languages?keyword=${keyword}`);

  if (!res.ok) throw new Error("Failed to Load.");

  return res.json();
};

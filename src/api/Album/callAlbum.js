const generateURL = (url, options) => {
  let _url = url + "?";

  Object.keys(options).forEach((key) => {
    const query = "&" + key + "=" + options[key];

    _url += query;
  });

  return _url;
};

const options = {
  per_page: 30,
  client_id: "lArlrouEq1MxqzfJJyG0mFKIJ31zpffw6H0jUH88z8k",
};

// const callAlbum = async () => {
//   const url = generateURL("https://api.unsplash.com/photos", options);
//   const response = await fetch(url);
//   const json = await response.json();
//   return json;
// };
const callAlbum = () => {
  const url = generateURL("https://api.unsplash.com/photos", options);
  return fetch(url);
};
export default callAlbum;

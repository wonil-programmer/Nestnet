import axios from "axios";

const fetchAlbums = async ({ setPage, page }) => {
  console.log(page);
  const res = await fetch(`http://localhost:3001/galleries?_page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  //   const data = await axios.get("http://localhost:3001/galleries", {
  //     params: {
  //       page,
  //     },
  //   });
  setPage((prev) => prev + 1);

  return data;
};

export default fetchAlbums;

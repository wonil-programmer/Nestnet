import axios from "axios";

const fetchAlbums = async ({ setPage, setHasMore, page = 1 }) => {
  const res = await fetch(`http://localhost:3001/galleries?_page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = res.json();
  //   const data = await axios.get("http://localhost:3001/galleries", {
  //     params: {
  //       page,
  //     },
  //   });
  setPage((prev) => prev + 1);
  if (data.length < 10) {
    setHasMore(false);
  } else {
    setHasMore(true);
  }
  return data;
};

export default fetchAlbums;

const StringCombinator = {
  // api 명세에 따라 이미지 경로를 조합하는 함수
  getImagePath(image) {
    const imageRootPath = `${process.env.REACT_APP_SERVER}/image`;
    // return `${imageRootPath}/${image.saveFilePath}/${image.saveFileName}`

    // test: json-server
    return `/${image.saveFilePath}/${image.saveFileName}`;
  },
  // 최근 글 url 경로를 조합하는 함수
  getRecentPostPath(category, postId) {
    return `${category}/${postId}`;
  },
};

export default StringCombinator;

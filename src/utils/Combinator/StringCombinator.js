const StringCombinator = {
  // api 명세에 따라 이미지 경로를 조합하는 함수
  getImagePath(image) {
    const imageRootPath = `${process.env.REACT_APP_SERVER}/image`;
    return `${imageRootPath}/${image.saveFilePath}/${image.saveFileName}`;

    // test: json-server
    // return `/${image.saveFilePath}/${image.saveFileName}`;
  },
  // 최근 글 url 경로를 조합하는 함수
  getRecentPostPath(category, postId) {
    return `${category}/${postId}`;
  },
  // 날짜 정보를 조합하는 함수
  getFormatDate(createdTime) {
    const year = createdTime[0];
    const month = createdTime[1];
    const day = createdTime[2];

    // 날짜를 조합하여 문자열로 반환
    return `${year}-${month}-${day}`;
  },
};

export default StringCombinator;

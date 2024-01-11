const StringCombinator = {
  getImagePath(image) {
    const imageRootPath = `${process.env.REACT_APP_SERVER}/image`;
    let saveFilePath = image.saveFilePath;
    let saveFileName = image.saveFileName;
    // let imagePath = imageRootPath + "/" + saveFilePath + "/" + saveFileName;
    // test: json-server
    let imagePath = "/" + saveFilePath + "/" + saveFileName;

    return imagePath;
  },
};

export default StringCombinator;

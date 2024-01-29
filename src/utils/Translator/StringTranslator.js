export const StringTranslator = {
  getPostCategoryURL(postCategory) {
    switch (postCategory) {
      case "NOTICE":
        return "";
      case "UNIFIED":
        return "";
      case "EXAM":
        return "";
      case "PHOTO":
        return "gallery";
      case "INTRODUCTION":
        return "";
      default:
        return null;
    }
  },
  getPostCategoryKOR(postCategory) {
    switch (postCategory) {
      case "NOTICE":
        return "공지";
      case "UNIFIED":
        return "통합";
      case "EXAM":
        return "족보";
      case "PHOTO":
        return "사진";
      case "INTRODUCTION":
        return "소개";
      default:
        return null;
    }
  },
};

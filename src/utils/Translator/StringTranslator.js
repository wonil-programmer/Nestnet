export const StringTranslator = {
  getPostCategoryURL(postCategory) {
    switch (postCategory) {
      case "NOTICE":
        return "notice-post";
      case "UNIFIED":
        return "unified-post";
      case "EXAM":
        return "exam-collection-post";
      case "PHOTO":
        return "photo-post";
      case "INTRODUCTION":
        return "introduction-post";
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

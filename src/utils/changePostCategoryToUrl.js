export const changePostCategoryToUrl = (postCategory) => {
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
};

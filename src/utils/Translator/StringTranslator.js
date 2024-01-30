import { PAGE_ROUTE } from "../../constant/Constant";

export const StringTranslator = {
  getPostCategoryURL(postCategory) {
    switch (postCategory) {
      case "NOTICE":
        return PAGE_ROUTE.NOTICE;
      case "UNIFIED":
        return PAGE_ROUTE.BOARD;
      case "EXAM":
        return PAGE_ROUTE.PEDIGREE;
      case "PHOTO":
        return PAGE_ROUTE.GALLERY;
      case "INTRODUCTION":
        return PAGE_ROUTE.ABOUT_ME;
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

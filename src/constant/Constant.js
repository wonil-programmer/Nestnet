export const AVAIL_AUTHORITY = [
  "회장",
  "부회장",
  "관리자",
  "재학생",
  "휴학생",
  "졸업생",
];

export const AUTHORITY_ENG_TO_KOR = Object.freeze({
  PRESIDENT: "회장",
  VICE_PRESIDENT: "부회장",
  MANAGER: "관리자",
  GENERAL_MEMBER: "재학생",
  ON_LEAVE_MEMBER: "휴학생",
  GRADUATED_MEMBER: "졸업생",
  WAITING_FOR_APPROVAL: "승인대기",
  WITHDRAWN_MEMBER: "탈퇴",
  // UNKNOWN: "알수없음",
});

export const AUTHORITY_KOR_TO_ENG = Object.freeze({
  회장: "PRESIDENT",
  부회장: "VICE_PRESIDENT",
  관리자: "MANAGER",
  재학생: "GENERAL_MEMBER",
  휴학생: "ON_LEAVE_MEMBER",
  졸업생: "GRADUATED_MEMBER",
  승인대기: "WAITING_FOR_APPROVAL",
  탈퇴: "WITHDRAWN_MEMBER",
  // 알수없음: "UNKNOWN",
});

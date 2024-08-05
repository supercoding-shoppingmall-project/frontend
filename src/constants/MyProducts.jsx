// 판매물품 조회 에러 메시지
export const ERROR_MESSAGES = {
  NOT_FOUND: "판매 물품을 찾을 수 없습니다.",
  UNAUTHORIZED: "인증되지 않았습니다. 다시 로그인해 주세요.",
  FORBIDDEN: "접근이 거부되었습니다. 권한이 없습니다.",
  GENERAL_ERROR: "판매 물품 조회 중 문제가 발생했습니다.",
  NO_RESPONSE: "응답을 받지 못했습니다.",
  REQUEST_ERROR: "요청 설정 중 오류가 발생했습니다.",
};

// 정렬 기준 데이터
export const SORT_OPTIONS = [
  { name: "기본 정렬", current: true },
  { name: "판매마감 임박순", current: false },
  { name: "판매마감 여유순", current: false },
  { name: "높은 가격순", current: false },
  { name: "낮은 가격순", current: false },
];

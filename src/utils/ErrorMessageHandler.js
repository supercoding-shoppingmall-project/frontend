import { ERROR_MESSAGES } from "../constants/MyProducts";

export const errorMessageHandler = (error) => {
  if (error.response) {
    console.error("판매 물품 조회 중 오류 발생:", error.response.data);
    console.error("상태 코드:", error.response.status);
    console.error("헤더:", error.response.headers);

    switch (error.response.status) {
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 403:
        return ERROR_MESSAGES.FORBIDDEN;
      default:
        return ERROR_MESSAGES.GENERAL_ERROR;
    }
  } else if (error.request) {
    console.error("응답을 받지 못했습니다:", error.request);
    return ERROR_MESSAGES.NO_RESPONSE;
  } else {
    console.error("요청 설정 중 오류 발생:", error.message);
    return ERROR_MESSAGES.REQUEST_ERROR;
  }
};

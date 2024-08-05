export const getEmailFromToken = (token) => {
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.email;
    } catch (error) {
      console.error("토큰 디코딩 오류:", error);
      return null;
    }
  }
  return null;
};

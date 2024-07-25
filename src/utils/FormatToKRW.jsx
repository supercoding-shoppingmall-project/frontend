// 원화로 변환하는 함수
function formatToKRW(amount) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}

export default formatToKRW;

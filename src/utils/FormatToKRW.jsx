const FormatToKRW = (price) => {
  // price가 숫자인지 확인하고, 숫자가 아니면 변환
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) {
    console.error("Price is not a number:", price);
    return "Invalid price";
  }
  return numericPrice.toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
  });
};

export default FormatToKRW;

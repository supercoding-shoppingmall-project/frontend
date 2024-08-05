import React from "react";

const DetailDescription = () => {
  const details = [
    {
      title: "무료 배송 및 반품",
      content: [
        "· 일반 배송",
        "· 배송지역: 전국 (일부 지역 제외)",
        "· 배송비: 무료배송 제품 수령일로부터 14일 이내 제품에 대해서만 무료 반품 서비스가 가능합니다.",
      ],
    },
    {
      title: "오늘도착 서비스",
      content: [
        "· 이용시간: 오전 10시 30분까지 결제 시, 당일 도착 (일요일, 공휴일 제외)",
        "· 서비스지역: 서울∙과천∙의왕∙군포∙수원∙성남∙안양시 전체, 용인시 수지구∙기흥구, 부천시 중동∙상동∙심곡동",
        "· 서비스비용: 5,000원",
      ],
    },
    {
      title: "A/S 안내",
      content: [
        "나이키 온라인에서 구매하신 제품에 대한 A/S 는 나이키코리아 고객센터(080-022-0182)에서 유선으로만 접수 가능합니다.",
      ],
    },
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="px-4 sm:px-0">
        <h3 className="text-2xl font-semibold leading-7 text-gray-900">
          추가 정보
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {details.map((detail, index) => (
            <div
              key={index}
              className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
            >
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {detail.title}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {detail.content.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default DetailDescription;

const MockDatas = [
  {
    id: 1,
    name: "나이키 캄",
    href: "#",
    price: "59000",
    imageSrc:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3b108ebb-551f-42b7-8bd9-36fa4709b367/NIKE+CALM+FLIP+FLOP.png",
    imageAlt: "나이키 캄 남성 플립플랍 - 라이트 브리티시 탠/라이트 브리티시 탠",
    closingDate: "2024-07-23",
    quantity: 5,
    highlights: ["상세스펙 1", "상세스펙 2", "상세스펙 3", "상세스펙 4"],
    details: "상품 상세 정보 상품 상세 정보 상품 상세 정보 ",
  },
  {
    id: 2,
    name: "나이키 인빈서블 3 블루프린트",
    href: "#",
    price: "209000",
    imageSrc:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3379dc97-3fb0-45b0-8c70-623751108b62/%EC%9D%B8%EB%B9%88%EC%84%9C%EB%B8%94-3-%EB%B8%94%EB%A3%A8%ED%94%84%EB%A6%B0%ED%8A%B8-%EB%82%A8%EC%84%B1-%EB%A1%9C%EB%93%9C-%EB%9F%AC%EB%8B%9D%ED%99%94-rvMRfiCS.png",
    imageAlt: "나이키 인빈서블 3 블루프린트 남성 로드 러닝화",
    closingDate: "2024-07-23",
    quantity: 5,
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  },
  {
    id: 3,
    name: "나이키 머큐리얼 베이퍼 16 엘리트",
    href: "#",
    price: "299000",
    imageSrc:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0fc8a614-6d59-4383-8549-acee737b84e5/%EB%A8%B8%ED%81%90%EB%A6%AC%EC%96%BC-%EB%B2%A0%EC%9D%B4%ED%8D%BC-16-%EC%97%98%EB%A6%AC%ED%8A%B8-ag-%ED%94%84%EB%A1%9C-%EB%A1%9C%EC%9A%B0-%ED%83%91-%ED%81%B4%EB%A6%AC%ED%8A%B8-%EC%B6%95%EA%B5%AC%ED%99%94-wFZXdaq9.png",
    imageAlt: "나이키 머큐리얼 베이퍼 16 엘리트 AG 프로 로우 탑 클리트 축구화",
    closingDate: "2024-07-23",
    quantity: 5,
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  },
  {
    id: 4,
    name: "에어 조던 4 RM",
    href: "#",
    price: "179000",
    imageSrc:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4a77744a-a08a-4a22-986c-c6cbefef1f77/%EC%97%90%EC%96%B4-%EC%A1%B0%EB%8D%98-4-rm-%EB%82%A8%EC%84%B1-%EC%8B%A0%EB%B0%9C-SfU6Z9Qv.png",
    imageAlt: "에어 조던 4 RM 남성 신발",
    closingDate: "2024-07-23",
    quantity: 5,
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  },
  {
    id: 5,
    name: "나이키 G.T. 컷 3 EP 블루프린트",
    href: "#",
    price: "229000",
    imageSrc:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dfb2f4cb-d487-4caa-a31e-3b5c7abbfb08/G.T.+CUT+3+EP+FP.png",
    imageAlt: "나이키 G.T. 컷 3 EP 블루프린트 농구화",
    closingDate: "2024-07-23",
    quantity: 5,
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  },
  {
    id: 6,
    name: "나이키 메트콘 9",
    href: "#",
    price: "169000",
    imageSrc:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/446c1c27-e84c-4bd9-8687-51b7451e692f/NIKE+METCON+9.png",
    imageAlt: "나이키 메트콘 9 남성 운동화",
    closingDate: "2024-07-23",
    quantity: 5,
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  },
  {
    id: 7,
    name: "나이키 빅토리 투어 3",
    href: "#",
    price: "279000",
    imageSrc:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9e65d06b-21b2-41e2-bfb2-bccb80a62e02/AR+ZM+VICTORY+TR+3+NRG+W+OC24.png",
    imageAlt: "나이키 빅토리 투어 3 골프화(엑스트라 와이드)",
    closingDate: "2024-07-23",
    quantity: 5,
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  },
  {
    id: 8,
    name: "나이키 GP 챌린지 프로 프리미엄",
    href: "#",
    price: "139000",
    imageSrc:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6588b4b4-847b-46bc-bb47-aa038f39e28d/gp-%EC%B1%8C%EB%A6%B0%EC%A7%80-%ED%94%84%EB%A1%9C-%ED%94%84%EB%A6%AC%EB%AF%B8%EC%97%84-%EB%82%A8%EC%84%B1-%ED%95%98%EB%93%9C-%EC%BD%94%ED%8A%B8-%ED%85%8C%EB%8B%88%EC%8A%A4%ED%99%94-esO7D9Wy.png",
    imageAlt: "나이키 GP 챌린지 프로 프리미엄 남성 하드 코트 테니스화",
    closingDate: "2024-07-23",
    quantity: 5,
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  },
];

export default MockDatas;

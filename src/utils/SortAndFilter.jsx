export const sortProducts = (products, sortOption) => {
	switch (sortOption) {
		case "판매마감 임박순":
			return [...products].sort(
				(a, b) => new Date(a.endtime) - new Date(b.endtime)
			);
		case "판매마감 여유순":
			return [...products].sort(
				(a, b) => new Date(b.endtime) - new Date(a.endtime)
			);
		case "높은 가격순":
			return [...products].sort((a, b) => b.productPrice - a.productPrice);
		case "낮은 가격순":
			return [...products].sort((a, b) => a.productPrice - b.productPrice);
		default:
			return products; // 기본 정렬
	}
};

export const filterProducts = (products, isAvailable) => {
	return products.filter(
		isAvailable ? (product) => new Date(product.endtime) > new Date() : (product) => new Date(product.endtime) <= new Date()
	)
}

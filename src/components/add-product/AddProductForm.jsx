import AddImages from "./AddImages";
import SelectCategory from "./SelectCategory";
import AddProductName from "./AddProductName";
import SizeQuantity from "./SizeQuantity";
import { STYLE, SIZES } from "../../constants/AddProducts";
import AddPrice from "./AddPrice";
import AddPeriod from "./AddPeriod";
import ProductDescription from "./ProductDescription";
import AddButtons from "./AddButtons";

export default function AddProductForm({
  onSubmit,
  onImagesChange,
  onDescriptionsChange,
  cancelHandle,
}) {
  return (
    <form
      id="addProductsForm"
      className={STYLE.addProductsForm}
      onSubmit={onSubmit}
    >
      <div className="space-y-12">
        <div className={STYLE.productInfo}>
          <h2 className={STYLE.formTitle}>상품 정보</h2>

          <AddImages onImagesChange={onImagesChange} />

          <div className={STYLE.column}>
            <SelectCategory />
            <AddProductName />
          </div>

          <div className="mt-10">
            <div className={STYLE.sizeQuantityTitle}>사이즈 및 개수</div>
            <div className={STYLE.sizeQuantity}>
              <SizeQuantity sizes={SIZES} />
            </div>
          </div>

          <div className={STYLE.column}>
            <AddPrice />
            <AddPeriod />
          </div>

          <div className={STYLE.column}>
            <ProductDescription onDescriptionsChange={onDescriptionsChange} />
          </div>
        </div>
      </div>

      <AddButtons cancelHandle={cancelHandle} />
    </form>
  );
}

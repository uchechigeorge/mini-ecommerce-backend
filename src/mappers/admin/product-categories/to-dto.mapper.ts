import {
  ReadProductCategoryDto,
  readProductCategoryDtoSchema,
} from "@dtos/v1/admin/product-categories/read-product-category.dto";
import { ProductCategory } from "@entities/product-category.entity";

function mapEntitytoReadDto(
  entity: ProductCategory
): Promise<ReadProductCategoryDto>;
function mapEntitytoReadDto(
  entity: ProductCategory[]
): Promise<ReadProductCategoryDto[]>;
async function mapEntitytoReadDto(
  entity: ProductCategory | ProductCategory[]
): Promise<ReadProductCategoryDto | ReadProductCategoryDto[]> {
  if (entity instanceof ProductCategory) {
    const result = await readProductCategoryDtoSchema.safeParseAsync(entity);
    if (!result.success) return null!;

    return result.data;
  } else {
    const result = Promise.all(
      (entity as ProductCategory[]).map(
        async (e) => await mapEntitytoReadDto(e)
      )
    );
    return result;
  }
}

export default mapEntitytoReadDto;

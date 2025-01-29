import {
  ReadProductDto,
  readProductDtoSchema,
} from "@dtos/v1/admin/products/read-product.dto";
import { Product } from "@entities/product.entity";

function mapEntitytoReadDto(entity: Product): Promise<ReadProductDto>;
function mapEntitytoReadDto(entity: Product[]): Promise<ReadProductDto[]>;
async function mapEntitytoReadDto(
  entity: Product | Product[]
): Promise<ReadProductDto | ReadProductDto[]> {
  if (entity instanceof Product) {
    const result = await readProductDtoSchema.safeParseAsync(entity);
    if (!result.success) return null!;

    return result.data;
  } else {
    const result = Promise.all(
      (entity as Product[]).map(async (e) => await mapEntitytoReadDto(e))
    );
    return result;
  }
}

export default mapEntitytoReadDto;

import { UpdateProductDto } from "@dtos/v1/admin/products/update-product.dto";
import { CreateProductDto } from "@dtos/v1/admin/products/create-product.dto";
import {
  CreateProductParams,
  UpdateProductParams,
} from "@repos/products/types";

export const mapCreateDtoToEntity = (
  createDto: CreateProductDto,
  imageUrl: string
) => {
  const entity: CreateProductParams = {
    ...createDto,
    imageUrl,
  };

  return entity;
};

export const mapUpdateDtoToEntity = (updateDto: UpdateProductDto) => {
  const entity: UpdateProductParams = {
    ...updateDto,
  };

  return entity;
};

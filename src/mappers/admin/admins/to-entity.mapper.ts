import { CreateAdminDto } from "@dtos/v1/admin/admins/create-admin.dto";
import { CreateAdminParams } from "@repos/admins/types";
import bcrypt from "bcryptjs";

export const mapCreateDtoToEntity = async (createDto: CreateAdminDto) => {
  const hashedPassword = await bcrypt.hash(createDto.password, 12);
  const entity: CreateAdminParams = {
    ...createDto,
    password: hashedPassword,
  };

  return entity;
};

import {
  ReadAdminDto,
  readAdminDtoSchema,
} from "@dtos/v1/admin/admins/read-admin.dto";
import { Admin } from "@entities/admin.entity";

function mapEntitytoReadDto(entity: Admin): Promise<ReadAdminDto>;
function mapEntitytoReadDto(entity: Admin[]): Promise<ReadAdminDto[]>;
async function mapEntitytoReadDto(
  entity: Admin | Admin[]
): Promise<ReadAdminDto | ReadAdminDto[]> {
  if (entity instanceof Admin) {
    const result = await readAdminDtoSchema.safeParseAsync(entity);
    if (!result.success) return null!;

    return result.data;
  } else {
    const result = Promise.all(
      (entity as Admin[]).map(async (e) => await mapEntitytoReadDto(e))
    );
    return result;
  }
}

export default mapEntitytoReadDto;

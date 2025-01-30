import mapEntitytoReadDto from "./to-dto.mapper";
import { mapCreateDtoToEntity } from "./to-entity.mapper";
import {
  mapGetAllQueryToGetParams,
  mapGetOneQueryToGetParams,
} from "./to-get-params.mapper";

const adminMapper = {
  mapEntitytoReadDto,
  mapCreateDtoToEntity,
  mapGetAllQueryToGetParams,
  mapGetOneQueryToGetParams,
};

export default adminMapper;

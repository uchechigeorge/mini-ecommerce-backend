import mapEntitytoReadDto from "./to-dto.mapper";
import { mapCreateDtoToEntity, mapUpdateDtoToEntity } from "./to-entity.mapper";
import {
  mapGetAllQueryToGetParams,
  mapGetOneQueryToGetParams,
} from "./to-get-params.mapper";

const productMapper = {
  mapEntitytoReadDto,
  mapCreateDtoToEntity,
  mapUpdateDtoToEntity,
  mapGetAllQueryToGetParams,
  mapGetOneQueryToGetParams,
};

export default productMapper;

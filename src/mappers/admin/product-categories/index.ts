import mapEntitytoReadDto from "./to-dto.mapper";
import {
  mapGetAllQueryToGetParams,
  mapGetOneQueryToGetParams,
} from "./to-get-params.mapper";

const productCategoryMapper = {
  mapEntitytoReadDto,
  mapGetAllQueryToGetParams,
  mapGetOneQueryToGetParams,
};

export default productCategoryMapper;

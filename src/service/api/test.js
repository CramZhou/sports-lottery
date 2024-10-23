import { get, post } from "@/service/http";

export default {
  list: (params) => get("xxxx", params),
  create: (body) => post("xxxx", body)
};

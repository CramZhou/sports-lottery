import { get } from "@/service/http";

const baseUrl = "/main.php";

export default (params) => get(baseUrl, params);

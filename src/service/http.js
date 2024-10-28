import axios from "axios";
import NProgress from "nprogress";
import { showToast } from "vant";
import { getToken } from "@/service/permission/auth";
import errorCode from "@/service/errorCode";

/**
 * 错误提示
 * @param {*} msgStr
 */
const showErrMsg = (msgStr) => {
  showToast({
    message: msgStr || "网络错误",
    icon: "warning-o"
  });
};

// 创建axios实例
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10 * 1000 // 请求超时时间
});

/**
 * 错误处理
 * @param {*} error
 */
const errorHandler = (error) => {
  const res = error?.response?.data;
  const msgStr = res?.msg || res?.errmsg || res?.message;
  const errData = {
    msg: msgStr
  };
  const reqData = error.config.data;
  reqData && Object.assign(errData, { data: reqData });
  // showErrMsg(msgStr);
  throw error;
};

// request 拦截器
service.interceptors.request.use(
  (config) => {
    const tempConfig = config;
    // 是否需要设置 token
    const isToken = tempConfig.headers?.isToken === false;
    if (getToken() && !isToken) {
      tempConfig.headers.Authorization = `Bearer ${getToken()}`;
    }

    return tempConfig;
  },
  (error) => {
    errorHandler(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const { data, request } = response;

    // 二进制数据则直接返回
    if (["blob", "arraybuffer"].includes(request.responseType)) {
      return data;
    }

    const { code, msg } = data;

    if ([0, 200].includes(code) || code === undefined) {
      return Promise.resolve(data);
    } else {
      // const errorMsg = errorCode[code] ?? msg ?? errorCode.default;
      // showErrMsg(errorMsg);
      return Promise.reject(new Error(msg));
    }
  },
  (error) => {
    errorHandler(error);
  }
);

export default service;

/**
 * ------------------------------------------------------------------------------
 * 请求方式
 */
const commonProcess = (promise, resolve, reject) => {
  promise
    .then((res) => resolve(res))
    .catch((err) => reject(err))
    .finally(() => NProgress.done());
};

export const get = (url, params, options) =>
  new Promise((resolve, reject) => {
    NProgress.start();
    const requestInstance = service.get(url, { params: { ...params, ...options } });
    commonProcess(requestInstance, resolve, reject);
  });

export const post = (url, body, headers = {}) =>
  new Promise((resolve, reject) => {
    NProgress.start();
    const requestInstance = service.post(url, body, { headers });
    commonProcess(requestInstance, resolve, reject);
  });

export const remove = (url, body) =>
  new Promise((resolve, reject) => {
    NProgress.start();
    const requestInstance = service.delete(url, { data: body });
    commonProcess(requestInstance, resolve, reject);
  });

export const put = (url, body, headers = {}) =>
  new Promise((resolve, reject) => {
    NProgress.start();
    const requestInstance = service.put(url, body, { headers });
    commonProcess(requestInstance, resolve, reject);
  });

/**
 * async await调用接口时，抹平try catch
 * @param {*} promise
 * @param {*} errorTxt
 * @returns { response: {} = {}, error }
 * const { response: {}, error } = await flatTryCatch()
 */
export const flatTryCatch = (promise, errorTxt) =>
  promise
    .then((response = {}) => ({ response }))
    .catch((err) => ({ response: {}, error: errorTxt ?? err }))
    .finally();

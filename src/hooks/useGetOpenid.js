import { projectApi } from "@/service";
import proofStore from "@/store/proof";

const store = proofStore();

const appid = "wx2ca83ce0b1ec271c";

export default () => {
  // 1、用appid跳转open.weixin.qq.com，换code在url上
  const getUrlCode = () => {
    const url = window.location.search;
    const theRequest = {};
    if (url.indexOf("?") !== -1) {
      url
        .substring(1)
        .split("&")
        .forEach((str) => {
          const [key, value] = str.split("=");
          theRequest[key] = value;
        });
    }
    return theRequest;
  };

  // 2、用code调接口，拿到openid,并存在全局
  const getOpenid = () => {
    const { href } = window.location; // 获取页面url
    const { code } = getUrlCode(); // 第一步获取的code
    if (code == null || code === "") {
      // 没有code去拿code;
      // eslint-disable-next-line max-len
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&response_type=code&scope=snsapi_base&state=123&redirect_uri=${encodeURIComponent(
        href
      )}`;
    } else {
      projectApi({ method: "getopenid", code }).then(({ data, sucess }) => {
        if (sucess === 1) {
          store.openid = data.openid;
        }
      });
    }
  };

  return { getOpenid };
};

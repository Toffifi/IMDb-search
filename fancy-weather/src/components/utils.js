export function urlBuilder(apiUrl, params) {
  let url = apiUrl;
  const paramsStr = Object.entries(params).map((e) => `${e[0]}=${e[1]}`).join('&');
  if (paramsStr.length > 0) {
    url += `?${paramsStr}`;
  }
  return url;
}

export function getLocalTime(offset) {
  return new Date(Date.now() + (offset - (new Date().getTimezoneOffset() * 60 * -1)) * 1000);
}

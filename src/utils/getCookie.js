/**
 * Получение куки
 * @returns {string} Значение куки
 */
export function getCookie() {
  const cookieName = 'token';
  const name = cookieName + '=';
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });

  return res;
}

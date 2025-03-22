export default function prettifyAxiosError(e: any) {
  const responseData = e?.response?.data;
  const errMsg = e?.message;
  if (responseData && errMsg) {
    return `${errMsg}: ${responseData}`;
  } else if (responseData) {
    return responseData;
  } else if (errMsg) {
    return errMsg;
  } else {
    return "An unknown error occurred";
  }
}

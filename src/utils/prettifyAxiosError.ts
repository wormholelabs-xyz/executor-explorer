export default function prettifyAxiosError(e: any) {
  const responseData = e?.response?.data;
  const errMsg = e?.message;
  const errDetails = responseData?.message || responseData;

  if (errDetails && errMsg) {
    return `${errMsg}: ${errDetails}`;
  } else if (errDetails) {
    return errDetails;
  } else if (errMsg) {
    return errMsg;
  } else {
    return "An unknown error occurred";
  }
}

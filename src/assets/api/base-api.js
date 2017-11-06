/*
  Simple Vanilla AJAX
*/

function isValidStatus(status) {
  return /^[2-3][0-9][0-9]$/.test(status);
}

function setContentTypeHeader(obj) {
  obj.setRequestHeader('Content-Type', 'application/json');
}

function parseResponse(requestUrl, response) {
  const responseStatus = response.status;
  const validStatus = isValidStatus(responseStatus);
  if (validStatus) {
    return {
      status: responseStatus,
      responseObj: JSON.parse(response.responseText)
    };
  }
  console.log('An error occurred');
  return {
    status: response.status,
    error: true
  };
}

export function request(type, requestUrl, data, callback) {
  const parsedRequestUrl = `${BASE_URL}${requestUrl}`;
  const requestObj = new XMLHttpRequest();
  requestObj.timeout = 15000;
  requestObj.open(type.toUpperCase(), parsedRequestUrl, true);
  setContentTypeHeader(requestObj);
  requestObj.onreadystatechange = () => {
    if (requestObj.readyState === 4) {
      callback(parseResponse(requestUrl, requestObj));
    }
  };
  requestObj.send(JSON.stringify(data));
}

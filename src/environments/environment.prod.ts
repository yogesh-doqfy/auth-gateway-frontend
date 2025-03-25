// export const environment = {
//   production: true,
//   api: "https://doqfy.live",
//   // api: "http://127.0.0.1:8000",
//   // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiICIsInVzZXJfaWQiOjQsImVtYWlsIjoiYW51cmFnQGRvcWZ5LmluIiwiZXhwIjoxNzEyMzIxMzg0fQ.FnSY69xWF0UdcQWsyjZpg0MfdsFiRufTvoZSInAyW5I"
// };

export const environment = {
  production: true,
  title: 'prod',
  api: determineApiUrl()
};

function determineApiUrl() {
  const host = window.location.host;
  const apiUrls:any = {
    'beta1-auth-gateway.doqfy.in': 'https://beta1-auth-gateway-api.doqfy.in',
    'beta2-auth-gateway.doqfy.in': 'https://beta2-auth-gateway-api.doqfy.in',
    'uat-gateway.doqfy.in': 'https://uat-gateway-api.doqfy.in',
  };
  const apiUrl = apiUrls[host] || 'https://beta2-auth-gateway-api.doqfy.in';
  return apiUrl;
}



// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   // api: "http://127.0.0.1:8000"
//   api:"https://doqfy.live"
// };

export const environment = {
  production: false,
  title: 'Local',
  api: determineApiUrl()
};

function determineApiUrl() {
  const host = window.location.host;
  const apiUrls:any = {
    'beta1-auth-gateway.doqfy.in': 'https://beta1-auth-gateway-api.doqfy.in',
    'beta2-auth-gateway.doqfy.in': 'https://beta2-auth-gateway-api1.doqfy.in',
    'uat-gateway.doqfy.in': 'https://uat-gateway-api.doqfy.in',
  };

  const apiUrl = apiUrls[host] || 'https://beta2-auth-gateway-api1.doqfy.in';

  return apiUrl;
}




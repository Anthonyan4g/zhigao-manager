// 环境配置封装

type ENV = 'stg' | 'prd' | 'dev'
// let env: ENV = 'dev'
// if (location.host.indexOf('localhost') > -1) {
//   env = 'dev'
// } else if (location.host === 'driver-stg.marsview.cc') {
//   env = 'stg'
// } else {
//   env = 'prd'
// }

const env = (document.documentElement.dataset.env as ENV) || 'dev'
const config = {
  dev: {
    baseApi: './api',
    uploadApi: 'http://api-driver-dev.marsview.cc',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/e41b45315f3f84c0231d182e50a534fa'
  },
  stg: {
    baseApi: './api',
    uploadApi: 'http://api-driver-stg.marsview.cc',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/e41b45315f3f84c0231d182e50a534fa'
  },
  prd: {
    baseApi: './api',
    uploadApi: 'http://api-driver.marsview.cc',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/e41b45315f3f84c0231d182e50a534fa'
  }
}
export default {
  env,
  ...config[env]
}

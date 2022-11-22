vueblog
├── build   构建脚本目录
│   ├── build.js  生产环境构建脚本
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js  构建相关工具方法
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js  wabpack基础配置
│   ├── webpack.dev.conf.js   wabpack开发环境配置
│   └── webpack.prod.conf.js  wabpack生产环境配置
├── config    项目配置
│   ├── dev.env.js  开发环境变量
│   ├── index.js    项目配置文件
│   └── prod.env.js 生产环境变量
├── dist
│   ├── index.html
│   └── static
│       ├── css
│       ├── fonts
│       ├── img
│       └── js
├── index.html  入口页面
├── package-lock.json
├── package.json  npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
├── src   源码目录
│   ├── App.vue   根组件
│   ├── assets    资源目录，这里的资源会被wabpack构建
│   │   └── logo.png
│   ├── components  公共组件目录
│   │   ├── ArticleList.vue
│   │   ├── BlogCfg.vue
│   │   ├── BlogDetail.vue
│   │   ├── BlogTable.vue
│   │   ├── CateMana.vue
│   │   ├── DataCharts.vue
│   │   ├── Home.bak.vue
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── PostArticle.vue
│   │   └── UserMana.vue
│   ├── main.js 入口js文件
│   ├── router  前端路由
│   │   └── index.js
│   ├── styles
│   │   └── element-variables.scss
│   └── utils
│       ├── api.js
│       ├── filter_utils.js
│       └── utils.js
├── static  纯静态资源，不会被wabpack构建
└── tree.md

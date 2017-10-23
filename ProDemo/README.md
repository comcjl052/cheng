
# react proDemo

> 基于react，webpack，可同时构建ios，android，wap端的应用框架。

### 使用

运行环境：Windows

安装：nodejs

在项目根目录运行：

<code>npm i -g</code>

如果配置了淘宝镜像，可使用 <code>cnpm i -g</code>命令

### 项目结构

+ bin：项目中所用相关脚本
  - buildHtml：webpack打包完成后，将html文件进行相关处理后（例如对js文件进行gzip）生成到输出目录
  - buildLib：脚本公共库
  - copyFiles：需要输出ios，android版本时，会运行该脚本，将输出目录release_app下的文件拷贝到APICLOUD项目目录中（需配置apicloud项目地址）
  - createPage：创新新页面时运行该脚本
+ 输出目录：
  - dev：开发环境的输出目录
  - release0-3：发布环境的输出目录，使用配置config0-3.js
  - release_app：app的输出目录
+ src：代码文件
  - lib：基础库+基础组件
  - general：项目相关的公共样式，js文件，公共组件
  - page：页面目录

### 新建页面

运行命令： <code>npm run page fileName title css</code>

命令参数说明：

> fileName: 文件名称

> title: 页面标题

> css: 页面是否需要样式文件

### 资源引用

> js文件: <code>var Js = require('fileName')</code>

> css文件: <code>require('fileNameCss')</code>

> image: <code>require('fileNameImg')</code>

### 调试

运行命令： <code>npm run watch</code>

命令运行成功后，会在根目录生成<code>dev</code>目录，该目录下<code>html</code>/中的文件即可在游览器中正常运行，当<code>src</code>目录中有文件被修改时，会实时更新到<code>dev</code>目录

### 发布

运行命令： <code>npm run release num</code> 输出 wap 端

运行命令： <code>npm run release-gzip num</code> 输出 wap端gzip版

运行命令： <code>pm run release-app num</code> 输出 app 端

命令参数说明：

> num: 打包时所调用的src/general/common/js/config.js版本，如：1=>config1.js，会在根目录输出release1目录



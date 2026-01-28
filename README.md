# mvc-extended-framework

MVC 擴展框架是基於 PureMVC 架構概念為基礎，採用 JavaScript 實踐並提供跨 Iframe、Page 間的統一通訊界面。

## 開發運維框架

[開發運維框架](https://github.com/eastmoon/devops-cli-framework)是提供 DevOps 在基礎架構即程式 ( Infrastructure as Code ) 設計概念下，將專案的開發、發佈歸納入專案管理的腳本下，確保轉移至任何開發環境都能基於相應的命令介面執行相應內容。

### 開發模式

使用指令 ```do dev``` 啟動開發環境，預設進入 [mvcef](./app/mvcef) 專案內，若要進入 [demo](./app/demo) 請如下操作。

+ [mvcef](./app/mvcef) 為 mvc-extended-framework 核心專案
    - 使用 ```do dev``` 預設進入
    - 使用 ```npm run test``` 驗證單元測試是否完成
    - 使用 ```npm run build``` 發佈函示庫供其他專案使用
+ [demo](./app/demo)
    - 使用 ```do dev --into=demo``` 進入
    - 使用 ```npm run serve``` 啟動開發伺服器驗證畫面
    - 使用 ```npm run build``` 發佈函示庫供其他專案使用

demo 專案主要是用來驗證與測試 MVC 擴展框架的範例專案，因此，其專案啟動會需引入一個來自 mvcef 的發佈目錄，而這部分的內容來自 mvcef 的 ```npm run build``` 產出。 

## 功能描述

+ 使用 Node.js 的 typescript 發佈成 .js 函示庫供其他專案引用。
+ 使用 Node.js 與 Mocha 測試與驗證程式碼。
+ 使用 Fingerprint 設計 uid，參數使用 [AmIUnique](https://amiunique.org/fingerprint) 推薦建立該當前瀏覽器的指紋。
+ 可跨 iframe 存取 MVC 實體，[Singleton](./app/mvcef/src/pattern/singleton) 存取於根 Window
+ 可跨 page 事件通訊服務，採用 [BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)

## 框架設計

框架設計會包括兩個主要架構設計：

+ [Model View Controller](https://www.geeksforgeeks.org/mvc-design-pattern/)
+ [Pipe and Filter](https://www.geeksforgeeks.org/pipe-and-filter-architecture-system-design/)

此兩個架構設計概念，會基於 [GoF Design Pattern](https://en.wikipedia.org/wiki/Design_Patterns) 一書所述的設計樣式實踐成框架。

## 設計樣式

下列為本專案完成的設計樣式

+ Facade
    - [Model View Controller](./app/mvcef/src/pattern/facade/mvc)、[testcase](./app/mvcef/test/pattern/facade-mvc.spec.ts)
    - [Progress ( Pipe & Filter )](./app/mvcef/src/pattern/facade/progress)、[testcase](./app/mvcef/test/pattern/facade-progress.spec.ts)
    - [Container](./app/mvcef/src/pattern/facade/container)、[testcase](./app/mvcef/test/pattern/facade-container.spec.ts)
+ [Singleton](./app/mvcef/src/pattern/singleton)、[testcase](./app/mvcef/test/pattern/singleton.spec.ts)
+ [Observer](./app/mvcef/src/pattern/observer)、[testcase](./app/mvcef/test/pattern/observer.spec.ts)
+ [Command](./app/mvcef/src/pattern/command)、[testcase](./app/mvcef/test/pattern/command.spec.ts)
+ [Mediator](./app/mvcef/src/pattern/mediator)、[testcase](./app/mvcef/test/pattern/mediator.spec.ts)
+ [Proxy](./app/mvcef/src/pattern/proxy)、[testcase](./app/mvcef/test/pattern/proxy.spec.ts)

## PureMVC 框架實用規劃

以下規劃應根據使用框架 React、Vue、Angular 額外實踐。

+ 應用核心 ( Application )
    - 唯一介面 ( Singleton Facade ) 樣式設計
    - 可供存取 Model、View、Controller 註冊內容

+ 控制器 ( Controller )
    - 進程 ( Progress )
        + 基於 Pipe & Filter 架構設計

+ 模型 ( Model )
    - 服務 ( Service )
        + 用於執行遠端介面的業務邏輯
        + 僅負責管理發送邏輯
        + 僅負責統一整理取回資料
    - 代理 ( Proxy )
        + 數據彙整的資料模型
        + 若數據變更，基於觀察者 ( Observer ) 樣式廣播給偵聽者
    - 狀態 ( State )
        + 視圖元件的狀態，亦即 MVP 架構中的 Presenter
        + 狀態分類為模型，但設計詳細參考視圖說明

+ 視圖 ( View )
    - 頁面 ( Page )
        + 基於互動框架 ( React、Vue、Angular ) 規範，複合數個圖層，以 HTML、CSS、JavaScript 組成的頁面藍圖
        + 頁面負責管理相關的圖層註冊
        + 頁面負責管理相關的代理啟動
        + 頁面負責管理相應的流程啟動
        + 應註冊至應用核心
    - 圖層 ( Layer )
        + 基於互動框架 ( React、Vue、Angular ) 規範，以 HTML、CSS、JavaScript 組成座標框
        + 呈現內容是系統提供的模塊或元件
        + 應註冊至應用核心
    - 模塊 ( Module )
        + 基於互動框架 ( React、Vue、Angular ) 規範，複合數個元件，並以 HTML、CSS、JavaScript 組成互動行為與呈現內容
        + 應可於元件開發伺服器獨立測試與編輯
    - 元件 ( Compoennt )
        + 基於互動框架 ( React、Vue、Angular ) 規範，以 HTML、CSS、JavaScript 組成互動行為與呈現內容
        + 應可於元件開發伺服器獨立測試與編輯

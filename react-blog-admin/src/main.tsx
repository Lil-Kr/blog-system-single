import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import App from './App'
import { HashRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

// redux stroe
import store, { persistor } from '@/redux'
import { Provider } from 'react-redux'

// 国际化
import '@/locales'

// 自动去除默认样式, 初始化样式, 接下来才是引入自己的样式
import 'reset-css'

// 引入全局样式
import '@/assets/styles/global.scss'
import '@/assets/iconfont/iconfont.scss'
import { Spin } from 'antd'

/**
 * 使用 ReactDOM.render 渲染, 解决 react18(ReactDOM.createRoot) 并发模式下带来的问题
 * https://github.com/react-component/menu/pull/551
 * https://github.com/ant-design/ant-design/issues/38534
 */
// ReactDOM.render(
// 	<Provider store={store}>
// 		<PersistGate loading={<Spin />} persistor={persistor}>
// 			<HashRouter>
// 				<App />
// 			</HashRouter>
// 		</PersistGate>
// 	</Provider>,
// 	document.getElementById('root')
// )

// react 18 使用 ReactDOM.createRoot 渲染, antd Menu 菜单(子菜单组件) 在收缩展开时会闪烁, 先使用ReactDOM.render渲染组件, 等待官方修复

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persistor}>
        <HashRouter>
          <App />
        </HashRouter>
      </PersistGate>
    </Provider>
);

// ReactDOM.createRoot( 
//   document.getElementById('root')).render(
//     <Provider store={store}>
//       <PersistGate loading={<Spin />} persistor={persistor}>
//         <HashRouter>
//           <App />
//         </HashRouter>
//       </PersistGate>
//     </Provider>`
// )

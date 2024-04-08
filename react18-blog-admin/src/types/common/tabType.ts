import type {
  AnimatedConfig,
  EditableConfig,
  OnTabScroll,
  RenderTabBar,
  Tab,
  TabBarExtraContent,
  TabPosition,
  TabsLocale
} from 'node_modules/rc-tabs/lib/interface'
/**
 * Tabs type
 */
interface TabsState {
  tabActive?: TabType
  tabList: TabType[]
}

interface TabType extends Tab {
  key: string
  path: string
  label: string | React.ReactNode
  closable: boolean
}

export type { TabsState, TabType }

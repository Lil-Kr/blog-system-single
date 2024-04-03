/**
 * Tabs type
 */
interface TabsState {
  tabActive?: TabType;
  tabsList: TabType[];
}

interface TabType {
  key: string
  path: string
  label: string
  closable: boolean
}

export type { TabsState, TabType }
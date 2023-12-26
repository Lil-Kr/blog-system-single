import type { SizeType } from "antd/lib/config-provider/SizeContext"

/* themeConfigProp */
export interface ThemeConfigProp {
  primary: string;
  isDark: boolean;
  weakOrGray: string;
}

/* GlobalState */
export interface GlobalState {
  token: string;
  userInfo: any;
  assemblySize: SizeType;
  language: string;
  themeConfig: ThemeConfigProp;
}
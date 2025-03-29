import { OptionType } from '@/types/apis'
import { SysOrgAllResp } from '@/types/apis/sys/org/orgType'

/**
 * 将组织信息转换为下拉选择器选项
 * @param orgList
 * @returns
 */
const transformOrgInfoToSeletor = (orgList: SysOrgAllResp[]): OptionType[] => {
  return orgList.map(({ surrogateId, name }) => ({
    value: surrogateId,
    label: name
  }))
}

export { transformOrgInfoToSeletor }



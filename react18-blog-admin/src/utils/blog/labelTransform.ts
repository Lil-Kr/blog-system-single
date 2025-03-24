import { LabelListTableType, LabelTableResq } from '@/types/apis/blog/labelType'

/**
 * 将标签列表转换为表格数据
 */
const labelTransformToTable = (list: LabelTableResq[]): LabelListTableType[] => {
  return list.map(({ surrogateId, ...rest }) => ({
    key: surrogateId,
    ...rest
  }))
}

export { labelTransformToTable }

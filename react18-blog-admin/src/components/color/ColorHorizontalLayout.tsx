import React from 'react'
import {
  cyan,
  green,
  red,
  volcano,
  gold,
  orange,
  yellow,
  lime,
  blue,
  geekblue,
  purple,
  magenta,
  grey,
  gray,
  generate,
  presetPalettes
} from '@ant-design/colors'
import { Col, ColorPicker, ColorPickerProps, Divider, Row, theme } from 'antd'
import { useColorStore } from '@/store/blog/colorStore'
import { Color } from 'antd/lib/color-picker'

type Presets = Required<ColorPickerProps>['presets'][number]

const genPresets = (presets = presetPalettes) => {
  return Object.entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors
  }))
}

const ColorHorizontalLayout = (props: { selectColor: string }) => {
  const { selectColor } = props
  const { colorHex, setColorHex } = useColorStore()

  const { token } = theme.useToken()
  const presets = genPresets({
    primary: generate(token.colorPrimary),
    cyan,
    green,
    red,
    volcano,
    gold,
    orange,
    yellow,
    lime,
    blue,
    geekblue,
    purple,
    magenta,
    grey,
    gray
  })

  const customPanelRender: ColorPickerProps['panelRender'] = (_, { components: { Picker, Presets } }) => (
    <Row justify='space-between' wrap={false}>
      <Col span={12}>
        <Presets />
      </Col>
      <Divider type='vertical' style={{ height: '100px' }} />
      <Col flex='auto'>
        <Picker />
      </Col>
    </Row>
  )

  return (
    <ColorPicker
      showText={true}
      value={selectColor ? selectColor : colorHex}
      styles={{ popupOverlayInner: { width: 500 } }}
      presets={presets}
      panelRender={customPanelRender}
      onChange={color => setColorHex(color.toHexString())}
    />
  )
}

export default ColorHorizontalLayout

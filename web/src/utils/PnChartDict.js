
const textAligns = [
  {
    label: '自动',
    value: 'auto'
  },
  {
    label: '左对齐',
    value: 'left'
  },
  {
    label: '居中',
    value: 'center'
  },
  {
    label: '右对齐',
    value: 'right'
  }
];

const verticalAligns = [
  {
    label: '自动',
    value: 'auto'
  },
  {
    label: '上',
    value: 'top'
  },
  {
    label: '中',
    value: 'middle'
  },
  {
    label: '下',
    value: 'bottom'
  }
];

const labelPositions = [
  {
    label: 'outside',
    value: 'outside',
    remark: '饼图扇区外侧，通过视觉引导线连到相应的扇区'
  },
  {
    label: 'inside',
    value: 'inside',
    remark: '饼图扇区内部'
  },
  {
    label: 'center',
    value: 'center',
    remark: '在饼图中心位置'
  },
];

const orients = [
  {
    label: '横向',
    value: 'horizontal'
  },
  {
    label: '竖向',
    value: 'vertical'
  }
];

const pieRoseTypes = [
  {
    label: '不设置',
    value: false,
    remark: ''
  },
  {
    label: 'radius',
    value: 'radius',
    remark: '扇区圆心角展现数据的百分比，半径展现数据的大小'
  },
  {
    label: 'area',
    value: 'area',
    remark: '所有扇区圆心角相同，仅通过半径展现数据大小'
  },
];


export default {
  textAligns,
  verticalAligns,
  labelPositions,
  orients,
  pieRoseTypes,
}


const borderStyles = [
  {
    label: '实线',
    value: 'solid'
  },
  {
    label: '虚线',
    value: 'dashed'
  },
  {
    label: '点线',
    value: 'dotted'
  },
  {
    label: '空',
    value: 'none'
  },
];

const display = [
  {
    label: '显示',
    value: 'block'
  },
  {
    label: '隐藏',
    value: 'none'
  }
];

const layoutSchemes = [
  {
    label: '大屏专用布局',
    value: 'AbsoluteLayoutCanvas'
  }
];

const cursor = [
  {
    label: '默认',
    value: 'default'
  },
  {
    label: '指针',
    value: 'pointer'
  }
];

const canvasGridClass = [
  {
    label: '5px * 5px 白色',
    value: 'canvas-grid-white-5px5px'
  },
  {
    label: '5px * 5px 黑色',
    value: 'canvas-grid-black-5px5px'
  },
  {
    label: '10px * 10px 白色',
    value: 'canvas-grid-white-10px10px'
  },
  {
    label: '10px * 10px 黑色',
    value: 'canvas-grid-black-10px10px'
  },
  {
    label: '20px * 20px 白色',
    value: 'canvas-grid-white-20px20px'
  },
  {
    label: '20px * 20px 黑色',
    value: 'canvas-grid-black-20px20px'
  }
];

const pixelUnits = [
  {
    label: 'px',
    value: 'px'
  },
  {
    label: '%',
    value: '%'
  },
  /*{
    label: 'em',
    value: 'em'
  },
  {
    label: 'rem',
    value: 'rem'
  },*/
];

const backgroundRepeats = [
  {
    label: '不重复',
    value: 'no-repeat'
  },
  {
    label: '重复',
    value: 'repeat'
  },
  {
    label: '横轴重复',
    value: 'repeat-x'
  },
  {
    label: '纵轴重复',
    value: 'repeat-y'
  },
];

const canvasSizes = [
  {
    label: 'IPhone 6/7/8',
    value: '375*667*px*px'
  },
  {
    label: 'IPhone 6/7/8 plus',
    value: '414*736*px*px'
  },
  {
    label: 'IPhone X',
    value: '375*812*px*px'
  },
  {
    label: 'IPad',
    value: '768*1024*px*px'
  },
  {
    label: 'IPad Pro',
    value: '1024*1366*px*px'
  },
];

const canvasSizes2 = [
  {
    label: '全屏',
    value: '100*100*%*%'
  },
  {
    label: '1024px * 768px',
    value: '1024*768*px*px'
  },
  {
    label: '1440px * 900px',
    value: '1440*900*px*px'
  },
  {
    label: '1680px * 1050px',
    value: '1680*1050*px*px'
  },
  {
    label: '1920px * 1080px',
    value: '1920*1080*px*px'
  }
];

const iframeScrollings = [
  {
    label: '显示',
    value: 'yes'
  },
  {
    label: '不显示',
    value: 'no'
  },
  {
    label: '自动',
    value: 'auto'
  },
];

const fontWeights = [
  {
    label: 'Normal',
    value: 'normal'
  },
  {
    label: 'Bold',
    value: 'bold'
  },
  {
    label: 'Bolder',
    value: 'bolder'
  },
  {
    label: 'Lighter',
    value: 'lighter'
  },
  {
    label: '100',
    value: '100'
  },
  {
    label: '200',
    value: '200'
  },
  {
    label: '300',
    value: '300'
  },
  {
    label: '400',
    value: '400'
  },
  {
    label: '500',
    value: '500'
  },
  {
    label: '600',
    value: '600'
  },
  {
    label: '700',
    value: '700'
  },
  {
    label: '800',
    value: '800'
  }
];

const textAligns = [
  {
    label: '左对齐',
    value: 'left'
  },
  {
    label: '居中对齐',
    value: 'center'
  },
  {
    label: '右对齐',
    value: 'right'
  },
];

const writingModes = [
  {
    label: '水平',
    value: 'horizontal-tb'
  },
  {
    label: '垂直',
    value: 'vertical-rl'
  },
];

const overflows = [
  {
    label: '自动',
    value: 'auto'
  },
  {
    label: '隐藏',
    value: 'hidden'
  }
];

/**
 * 数据源类型
 * @type {*[]}
 */
const dsTypes = [
  {
    label: '静态数据',
    value: 'static'
  },
  {
    label: 'API',
    value: 'api'
  }
];

/**
 *
 * @type {*[]}
 */
const targets = [
  {
    label: '当前页面跳转',
    value: '_self'
  },
  {
    label: '新窗口',
    value: '_blank'
  }
];

export default {
  borderStyles,
  display,
  layoutSchemes,
  cursor,
  canvasGridClass,
  pixelUnits,
  backgroundRepeats,
  canvasSizes,
  canvasSizes2,
  iframeScrollings,
  fontWeights,
  textAligns,
  writingModes,
  overflows,
  dsTypes,
  targets
}

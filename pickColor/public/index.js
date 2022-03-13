import ColorPipette from './color-pipette';
// 初始化
const pipette = new ColorPipette({
  container: document.body,
  scale: 2,
  listener: {
    onOk:({ color, colors }) => {
      console.log(color, colors);
    },
  }
});
// 开始取色
pipette.start();

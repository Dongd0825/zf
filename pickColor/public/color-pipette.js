"use strict";

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
var _exportNames = {};
// exports.default = void 0;

var _domToImage = _interopRequireDefault(require("./dom-to-image.js"));

var _helper = require("./helper.js");

var _interface = require("./interface.js");

Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interface[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 网页拾色器【吸管工具】
 */
class ColorPipette {
  constructor(props) {
    _defineProperty(this, "container", {});

    _defineProperty(this, "listener", {});

    _defineProperty(this, "rect", {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });

    _defineProperty(this, "canvas", {});

    _defineProperty(this, "scale", 1);

    _defineProperty(this, "magnifier", null);

    _defineProperty(this, "colorContainer", null);

    _defineProperty(this, "colors", []);

    _defineProperty(this, "tooltipVisible", true);

    _defineProperty(this, "useMagnifier", false);

    _defineProperty(this, "handleMove", e => {
      const {
        color,
        colors
      } = this.getPointColors(e);
      const {
        onChange = () => ''
      } = this.listener;
      const point = {
        x: e.pageX + 15,
        y: e.pageY + 15
      };
      const colorContainer = (0, _helper.renderColorInfo)({
        containerDom: this.colorContainer,
        color,
        colors,
        point
      });

      if (!this.colorContainer) {
        this.colorContainer = colorContainer;
        document.body.appendChild(colorContainer);
      }

      onChange({
        color,
        colors
      });
    });

    _defineProperty(this, "handleDown", e => {
      const {
        onOk = () => ''
      } = this.listener;
      const res = this.getPointColors(e);
      console.log(JSON.stringify(res.colors, null, 4));
      onOk(res);
      this.destroy();
    });

    _defineProperty(this, "handleKeyDown", e => {
      if (e.code === 'Escape') {
        this.destroy();
      }
    });

    try {
      var _noscript$parentNode;

      const {
        container,
        listener,
        scale = 1,
        useMagnifier = false
      } = props;
      this.container = container || document.body;
      this.listener = listener || {};
      this.rect = this.container.getBoundingClientRect();
      this.scale = scale > 4 ? 4 : scale;
      this.useMagnifier = useMagnifier; // 去除noscript标签，可能会导致

      const noscript = document.body.querySelector('noscript');
      noscript === null || noscript === void 0 ? void 0 : (_noscript$parentNode = noscript.parentNode) === null || _noscript$parentNode === void 0 ? void 0 : _noscript$parentNode.removeChild(noscript);
      this.initCanvas();
    } catch (err) {
      console.error(err);
      this.destroy();
    }
  }
  /**
   * 初始化canvas
   */


  initCanvas() {
    const {
      rect,
      scale
    } = this;
    const {
      x,
      y,
      width,
      height
    } = rect;
    const {
      canvas,
      ctx
    } = (0, _helper.getCanvas)({
      width: rect.width,
      height: rect.height,
      scale,
      attrs: {
        class: 'color-pipette-canvas-container',
        style: `
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          z-index: 10000;
          cursor: pointer;
          width: ${width}px;
          height: ${height}px;
        `
      }
    });
    this.canvas = canvas;
    this.ctx = ctx;
  }
  /**
   * 开始
   */


  async start() {
    try {
      await this.drawCanvas();
      document.body.appendChild(this.canvas);
      const tooltip = (0, _helper.drawTooltip)('按Esc可退出');
      document.body.appendChild(tooltip);
      setTimeout(() => {
        var _tooltip$parentNode;

        return tooltip === null || tooltip === void 0 ? void 0 : (_tooltip$parentNode = tooltip.parentNode) === null || _tooltip$parentNode === void 0 ? void 0 : _tooltip$parentNode.removeChild(tooltip);
      }, 2000); // 添加监听

      this.canvas.addEventListener('mousemove', this.handleMove);
      this.canvas.addEventListener('mousedown', this.handleDown);
      document.addEventListener('keydown', this.handleKeyDown);
    } catch (err) {
      console.error(err);
      this.destroy();
    }
  }
  /**
   * 结束销毁dom，清除事件监听
   */


  destroy() {
    var _this$canvas, _this$canvas$parentNo, _this$colorContainer, _this$colorContainer$;

    this.canvas.removeEventListener('mousemove', this.handleMove);
    this.canvas.removeEventListener('mousedown', this.handleDown);
    document.removeEventListener('keydown', this.handleKeyDown);
    (_this$canvas = this.canvas) === null || _this$canvas === void 0 ? void 0 : (_this$canvas$parentNo = _this$canvas.parentNode) === null || _this$canvas$parentNo === void 0 ? void 0 : _this$canvas$parentNo.removeChild(this.canvas);
    (_this$colorContainer = this.colorContainer) === null || _this$colorContainer === void 0 ? void 0 : (_this$colorContainer$ = _this$colorContainer.parentNode) === null || _this$colorContainer$ === void 0 ? void 0 : _this$colorContainer$.removeChild(this.colorContainer);
  }
  /**
   * 将dom节点画到canvas里
   */


  async drawCanvas() {
    const base64 = await _domToImage.default.toPng(this.container, {
      scale: this.scale
    }).catch(() => '');

    if (!base64) {
      return;
    }

    const img = await (0, _helper.loadImage)(base64);

    if (!img) {
      return;
    }

    this.ctx.drawImage(img, 0, 0, this.rect.width, this.rect.height);
  }
  /**
   * 处理鼠标移动
   */


  /**
   * 获取鼠标点周围的颜色整列
   */
  getPointColors(e) {
    const {
      ctx,
      rect,
      scale
    } = this;
    let {
      pageX: x,
      pageY: y
    } = e;
    x -= rect.x;
    y -= rect.y;
    const color = this.getPointColor(x, y);
    const size = 19;
    const half = Math.floor(size / 2);
    const info = {
      x: x - half,
      y: y - half,
      width: size,
      height: size
    };
    const colors = (0, _helper.getCanvasRectColor)(ctx, info, scale);
    return {
      color,
      colors
    };
  }
  /**
   * 获取鼠标点的颜色
   */


  getPointColor(x, y) {
    const {
      scale
    } = this;
    const {
      data
    } = this.ctx.getImageData(x * scale, y * scale, 1, 1);
    const r = data[0];
    const g = data[1];
    const b = data[2];
    const a = data[3] / 255;
    const rgba = {
      r,
      g,
      b,
      a
    };
    return (0, _helper.rbgaObjToHex)(rgba);
  }

}

var _default = ColorPipette;
exports.default = _default;
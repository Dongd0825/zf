// 订阅发布 中间有事件通道，调度中心
class EventEmmiter {
  constructor() {
    this._events = {};
  }

  on(type, callback) {
    const _events = this._events[type] || (this._events[type] = []);
    _events.push(callback);
  }

  once(type, callback) {
    function fireOnlyFn() {
      callback();
      this.removeListener(type, fireOnlyFn);
    }
    this.on(type, fireOnlyFn);
  }

  emit(type, ...args) {
    const _events = this._events(type);
    if (_events) {
      _events.forEach((_event) => {
        _event.apply(null, args);
      })
    }
  }

  removeListener(type, callback) {
    const _events = this._events[type];
    if (_events) {
      this._events = _events.filter(_event => _event !== callback);
    }
  }
}
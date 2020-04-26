const events: {
  [key: string]: Array<any>
} = {}

/**
 * 绑定事件
 * @param name 
 * @param self 
 * @param callback 
 */
function on (name: string, self: any = null, callback: Function) {
  const tuple = [self, callback]
  const callbacks = events[name]
  if (Array.isArray(callbacks)) {
    callbacks.push(tuple)
  } else {
    events[name] = [tuple]
  }
}

function _remove (name: string, self: any = null) {
  const callbacks = events[name]
  if (Array.isArray(callbacks)) {
    if (!self) {
      events[name] = []
    } else {
      events[name] = callbacks.filter((tuple) => tuple[0] !== self)
    }
  }
}

/**
 * 移除事件
 * @param name 
 * @param self 
 */
function remove (name: string, self: any = null) {
  if (!name) {
    Object.keys(events).forEach(_name => {
      _remove(_name, self)
    })
  } else {
    _remove(name, self)
  }
}

/**
 * 触发事件
 * @param name 
 * @param data 
 */
function emit (name: string, data = {}) {
  const callbacks = events[name]
  if (Array.isArray(callbacks)) {
    callbacks.map((tuple) => {
      const self = tuple[0]
      const callback = tuple[1]
      callback.call(self, name, data)
    })
  }
}

type CallbackFun = (data: any) => void;

const events: { [key: string]: CallbackFun[] } = {};

export function on(event: string, callback: CallbackFun): void {
  if (!events[event]) events[event] = [];
  events[event].push(callback);
}

export function emit(event: string, data?: any): void {
  if (events[event]) {
    for (let i = 0; i < events[event].length; i++) {
      events[event][i](data);
    }
  }
}

export function remove(event: string, callback?: CallbackFun): void {
  if (events) {
    if (events[event]) {
      events[event] = events[event].filter((cb) => cb !== callback);
    }
  } else {
    (events as any)[event] = [];
  }
}

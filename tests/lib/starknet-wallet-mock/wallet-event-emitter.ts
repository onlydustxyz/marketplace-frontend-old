export class WalletEventEmitter {
  #listeners: Record<string, (...args: unknown[]) => void> = {};

  waitFor(eventName: string) {
    return new Promise(resolve => {
      this.#listeners[eventName] = resolve;
    });
  }

  emit(eventName: string, ...args: unknown[]) {
    if (!this.#listeners[eventName]) {
      console.warn('No listener for event "connect"');
      return;
    }

    this.#listeners[eventName](...args);

    delete this.#listeners[eventName];
  }
}

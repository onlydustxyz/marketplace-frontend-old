type EventUnion =
  | {
      name: "autoConnect";
      payload: { address: string };
    }
  | {
      name: "connect";
      payload: { address: string };
    };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type Listener<Event> = UnionToIntersection<
  Event extends { name: infer EventName; payload: infer EventPayload }
    ? EventName extends string
      ? { [eventName in EventName]: Array<(payload: EventPayload) => void> }
      : { tr: (payload: never) => void }
    : { tr: (payload: never) => void }
>;

type Listeners = Listener<EventUnion>;

type PayloadOf<K extends keyof Listeners> = Parameters<Listeners[K][number]>[0];

export class WalletEventEmitter {
  #listeners: Listeners = {
    connect: [],
    autoConnect: [],
  };

  waitFor<EventName extends keyof Listeners>(eventName: EventName) {
    return new Promise<PayloadOf<typeof eventName>>(resolve => {
      this.#listeners[eventName].push(resolve);
    });
  }

  on<EventName extends keyof Listeners>(eventName: EventName, callback: (args: PayloadOf<EventName>) => void) {
    this.#listeners[eventName].push(callback);
  }

  off<EventName extends keyof Listeners>(eventName: EventName, callback: (args: PayloadOf<EventName>) => void) {
    const index = this.#listeners[eventName].indexOf(callback);

    if (index > -1) {
      this.#listeners[eventName].splice(index, 1);
    }
  }

  emit<EventName extends keyof Listeners>(eventName: EventName, args: PayloadOf<EventName>) {
    if (!this.#listeners[eventName]) {
      console.warn('No listener for event "connect"');
      return;
    }

    this.#listeners[eventName].forEach(listener => listener(args as any));

    delete this.#listeners[eventName];
  }
}

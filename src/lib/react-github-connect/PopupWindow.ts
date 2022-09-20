import { SuccessData } from "./GithubConnect";
import { toParams, toQuery } from "./utils";

class PopupWindow {
  id: string;
  url: string;
  options: Record<string, string>;
  window?: Window | null;
  promise?: Promise<SuccessData> | undefined;
  _iid?: number | null;

  constructor(id: string, url: string, options: Record<string, string> = {}) {
    this.id = id;
    this.url = url;
    this.options = options;
  }

  open() {
    const { url, id, options } = this;

    this.window = window.open(url, id, toQuery(options, ",")) as WindowProxy;
  }

  close() {
    this.cancel();
    this.window!.close();
  }

  poll() {
    this.promise = new Promise((resolve, reject) => {
      this._iid = window.setInterval(() => {
        try {
          const popup = this.window;

          if (!popup || popup.closed !== false) {
            this.close();

            reject(new Error("The popup was closed"));

            return;
          }

          if (popup.location.href === this.url || popup.location.pathname === "blank") {
            return;
          }

          const params = toParams(popup.location.search.replace(/^\?/, "")) as SuccessData;

          resolve(params);

          this.close();
        } catch (error) {
          /*
           * Ignore DOMException: Blocked a frame with origin from accessing a
           * cross-origin frame.
           */
        }
      }, 500);
    });
  }

  cancel() {
    if (this._iid) {
      window.clearInterval(this._iid);
      this._iid = null;
    }
  }

  then(onSuccess: (data: SuccessData) => void, onFailure: (err: Error) => void) {
    return this.promise!.then(onSuccess, onFailure);
  }

  static open(id: string, url: string, options: Record<string, string>) {
    const popup = new this(id, url, options);

    popup.open();
    popup.poll();

    return popup;
  }
}

export default PopupWindow;

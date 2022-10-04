/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC, PropsWithChildren, useCallback } from "react";

import PopupWindow from "./PopupWindow";
import { toQuery } from "./utils";

export interface SuccessData {
  code: string;
  [key: string]: string;
}

interface LoginGithubProps {
  clientId: string;
  redirectUri: string;
  buttonText?: string;
  className?: string;
  scope?: string;
  disabled?: boolean;
  onRequest?: () => void;
  onSuccess?: (data: SuccessData) => void;
  onFailure?: (error: Error) => void;
  popupHeight?: number;
  popupWidth?: number;
}

const LoginGithub: FC<PropsWithChildren<LoginGithubProps>> = ({
  children,
  clientId,
  redirectUri,
  buttonText = "Sign in with GitHub",
  className,
  scope = "user:email",

  popupHeight = 650,
  popupWidth = 500,
  onRequest,
  onSuccess,
  onFailure,
  disabled = false,
}) => {
  const onFailureCallback = useCallback(
    (error: Error) => {
      onFailure && onFailure(error);
    },
    [onFailure]
  );

  const onSuccessCallback = useCallback(
    (data: SuccessData) => {
      if (!data.code) {
        return onFailureCallback(new Error("'code' not found"));
      }

      onSuccess && onSuccess(data);
    },
    [onFailure, onSuccess]
  );

  const onClick = useCallback(() => {
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
    });

    // To fix issues with window.screen in multi-monitor setups, the easier option is to
    // center the pop-up over the parent window.
    const top = window.top!.outerHeight / 2 + window.top!.screenY - popupHeight / 2;
    const left = window.top!.outerWidth / 2 + window.top!.screenX - popupWidth / 2;

    const popup = PopupWindow.open("github-oauth-authorize", `https://github.com/login/oauth/authorize?${search}`, {
      height: popupHeight.toString(10),
      width: popupWidth.toString(10),
      top: top.toString(10),
      left: left.toString(10),
    });

    onRequest && onRequest();
    popup.then(
      (data: SuccessData) => onSuccessCallback(data),
      error => onFailureCallback(error)
    );
  }, [clientId, redirectUri, popupHeight, popupWidth]);

  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children || buttonText}
    </button>
  );
};

export default LoginGithub;

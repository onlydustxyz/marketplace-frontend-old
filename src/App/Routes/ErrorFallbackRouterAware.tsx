import { FC, useEffect, useRef } from "react";
import { FallbackProps } from "react-error-boundary";
import { useLocation, useNavigate } from "react-router-dom";

const ErrorFallbackRouterAware: FC<FallbackProps> = ({ resetErrorBoundary }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = useRef(location.pathname);

  useEffect(() => {
    if (pathname.current !== location.pathname) {
      resetErrorBoundary();
    }
  }, [location.pathname]);

  const refresh = () => {
    window.location.reload();
  };

  const goHome = () => {
    resetErrorBoundary();
    navigate("/");
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center">
      <div className="mb-8 text-4xl text-red-400/70">Oops, an unexpected error occurred</div>
      <div onClick={refresh} className="cursor-pointer text-2xl text-light-purple/90 underline">
        Try to refresh the app
      </div>
      {location.pathname !== "/" && (
        <div className="text-2xl text-light-purple/90">
          or
          <br />
          <div onClick={goHome} className="cursor-pointer underline">
            go back to the home page
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorFallbackRouterAware;

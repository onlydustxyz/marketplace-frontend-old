import { FC } from "react";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback: FC<FallbackProps> = () => {
  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex-grow flex flex-col items-center justify-center text-center">
      <div className="mb-8 text-4xl text-red-400/70">Oops, an unexpected error occurred</div>
      <div onClick={refresh} className="cursor-pointer text-2xl text-light-purple/90 underline">
        Try to refresh the app
      </div>
    </div>
  );
};

export default ErrorFallback;

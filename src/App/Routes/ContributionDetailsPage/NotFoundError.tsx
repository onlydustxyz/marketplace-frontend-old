import { FC } from "react";
import { FallbackProps } from "react-error-boundary";
import { Link } from "react-router-dom";

const NotFoundError: FC = () => {
  return (
    <div className="min-h-screen flex-grow flex flex-col items-center text-center">
      <div className="mt-40 mb-8 text-4xl text-red-400/70">Oops, it seems this project doesn't exist</div>
      <Link to="/contributions" className="cursor-pointer text-2xl text-light-purple/90 underline">
        Go back to Contributions Page
      </Link>
    </div>
  );
};

export default NotFoundError;

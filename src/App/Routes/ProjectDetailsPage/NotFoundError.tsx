import { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundError: FC = () => {
  return (
    <div className="justify-center md:justify-start px-2 pb-10 md:pb-0 flex-grow flex flex-col items-center text-center h-full">
      <div className="md:mt-40 mb-4 md:mb-8  text-4xl text-red-400/70">Oops, it seems this project doesn't exist</div>
      <Link to="/projects" className="cursor-pointer text-2xl text-light-purple/90 underline">
        Go back to Projects Page
      </Link>
    </div>
  );
};

export default NotFoundError;

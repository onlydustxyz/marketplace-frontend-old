import cn from "classnames";

type Props = {
  className?: string;
  size?: number;
};

export default function Star({ className, size = 24 }: Props) {
  const containerStyle = {
    height: `${size}px`,
    width: `${size}px`,
  };

  const svgScale = size / 17;

  const transformStyle = {
    transform: `scale(${svgScale.toFixed(4)})`,
  };

  return (
    <div style={containerStyle} className={cn(className, "relative")}>
      <div style={transformStyle}>
        <svg viewBox="0 0 33 33" height="33px" width="33px" className="absolute top-[-7px] left-[-8px]">
          <g filter="url(#filter0_d_115_960)">
            <path
              d="M16.5 6C11.8103 6 8 9.80024 8 14.5C8 19.1998 11.8002 23 16.5 23C21.1998 23 25 19.1998 25 14.5C25 9.80024 21.1998 6 16.5 6ZM21.5535 13.7723L19.5523 15.7229C19.4411 15.8341 19.3906 15.9857 19.4209 16.1373L19.896 18.8966C19.9667 19.2806 19.5523 19.5737 19.2087 19.3918L16.7325 18.088C16.591 18.0172 16.4293 18.0172 16.2878 18.088L13.8115 19.3918C13.4679 19.5737 13.0636 19.2806 13.1243 18.8966L13.5993 16.1373C13.6296 15.9857 13.5791 15.824 13.4679 15.7229L11.4667 13.7723C11.1837 13.4994 11.3454 13.0244 11.7295 12.9637L14.4988 12.5595C14.6504 12.5392 14.7818 12.4382 14.8526 12.2967L16.0957 9.79013C16.2675 9.43639 16.7729 9.43639 16.9447 9.79013L18.1879 12.2967C18.2586 12.4382 18.39 12.5291 18.5416 12.5595L21.3109 12.9637C21.695 13.0244 21.8567 13.4994 21.5737 13.7723H21.5535Z"
              fill="#D8B555"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_115_960"
              x="0"
              y="0"
              width="33"
              height="33"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.796078 0 0 0 0 0.223529 0 0 0 0.5 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_115_960" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_115_960" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

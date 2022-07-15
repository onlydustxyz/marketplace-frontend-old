import { FC } from "react";

const GatedBadge: FC = () => {
  return (
    <div className="h-[18px] w-[14px] flex flex-row items-center justify-center">
      <div className="h-[54px] w-[51px]">
        <svg width="51" height="54" viewBox="0 0 51 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_191_975)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.7371 22.4772C22.7371 21.1337 23.8688 20 25.316 20C26.7632 20 27.895 21.1337 27.895 22.4772V25.2632L22.7371 25.2632V22.4772ZM20.7371 25.2632V22.4772C20.7371 19.9713 22.8231 18 25.316 18C27.8089 18 29.895 19.9713 29.895 22.4772V25.2632L30.4103 25.2632C31.5499 25.2632 32.4737 26.24 32.4737 27.445V33.8181C32.4737 35.0231 31.5499 36 30.4103 36H20.2214C19.0818 36 18.158 35.0231 18.158 33.8181V27.445C18.158 26.24 19.0818 25.2632 20.2214 25.2632H20.7371Z"
              fill="url(#paint0_linear_191_975)"
            />
            <path d="M25.3157 28.842L25.3157 32.421" stroke="#10073A" strokeWidth="2" strokeMiterlimit="10" />
          </g>
          <defs>
            <filter
              id="filter0_d_191_975"
              x="0.157959"
              y="0"
              width="50.3157"
              height="54"
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
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.52 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_191_975" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_191_975" result="shape" />
            </filter>
            <linearGradient id="paint0_linear_191_975" x1="31" y1="19.5" x2="19" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#84B5FF" />
              <stop offset="1" stopColor="#227BFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default GatedBadge;

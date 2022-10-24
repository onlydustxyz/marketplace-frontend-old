interface Props {
  className?: string;
  size?: number;
}

export default function Reward({ className, size = 24 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={className}
      style={{ filter: "drop-shadow(0px 0px 8px #FFC978)", overflow: "visible" }}
    >
      <g filter="url(#filter)">
        <path
          d="M7.517.793C7.65.3 8.35.3 8.483.793l1.351 5.02a.5.5 0 0 0 .353.353l5.02 1.351c.493.133.493.833 0 .966l-5.02 1.351a.5.5 0 0 0-.353.353l-1.351 5.02c-.133.493-.833.493-.966 0l-1.351-5.02a.5.5 0 0 0-.353-.353L.793 8.483C.3 8.35.3 7.65.793 7.517l5.02-1.351a.5.5 0 0 0 .353-.353L7.517.793Z"
          fill="#FFE8AC"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x={0.423}
          y={0.423}
          width={15.154}
          height={15.154}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix values="0 0 0 0 0.875 0 0 0 0 0.697375 0 0 0 0 0.240625 0 0 0 1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_457_5645" />
        </filter>
      </defs>
    </svg>
  );
}

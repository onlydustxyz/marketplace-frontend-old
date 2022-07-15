interface Props {
  className?: string;
  size?: number;
}

export default function Technology({ className, size = 24 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.87692 5.245L4.57349 5.96248L1.43559 9.00894L4.54996 12.0326L3.85338 12.75L0 9.00894L3.87692 5.245Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5575 9.00854L13.42 5.96248L14.1166 5.245L17.9939 9.00935L14.1319 12.7504L13.4361 12.0322L16.5575 9.00854Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.955 14.6849L11.1259 2.89999L12.0416 3.30179L6.87073 15.0867L5.955 14.6849Z"
      />
    </svg>
  );
}

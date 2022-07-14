interface Props {
  className?: string;
  size?: number;
}

export default function Duration({ className, size = 24 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" className={className}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9 2.84C5.59793 2.84 2.84 5.59792 2.84 9C2.84 12.4021 5.59793 15.16 9 15.16C12.4021 15.16 15.16 12.4021 15.16 9C15.16 5.59792 12.4021 2.84 9 2.84ZM1.84 9C1.84 5.04564 5.04564 1.84 9 1.84C12.9544 1.84 16.16 5.04564 16.16 9C16.16 12.9544 12.9544 16.16 9 16.16C5.04564 16.16 1.84 12.9544 1.84 9Z"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.67858 9.48253V4.64999H9.67858V10.0775L6.85717 11.6094L6.38 10.7306L8.67858 9.48253Z"
      />
    </svg>
  );
}

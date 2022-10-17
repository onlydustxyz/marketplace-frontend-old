interface Props {
  className?: string;
  size?: number;
}

export default function TinyCross({ className, size = 24 }: Props) {
  return (
    <svg viewBox="0 0 16 16" className={className} height={size} width={size}>
      <path d="M13.303 15.289.575 2.56 2.697.439l12.728 12.728-2.122 2.122Z" />
      <path d="M15.425 2.56 2.697 15.29.575 13.167 13.303.44l2.122 2.122Z" />
    </svg>
  );
}

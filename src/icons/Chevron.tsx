interface Props {
  className?: string;
  size?: number;
}

export default function Chevron({ className, size = 24 }: Props) {
  return (
    <svg viewBox="0 0 18 18" className={className} height={size} width={size}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.6182 14.4546L5.34541 13.1818L10.109 8.41819L5.34541 3.65459L6.6182 2.3818L12.6546 8.41819L6.6182 14.4546Z"
      />
    </svg>
  );
}

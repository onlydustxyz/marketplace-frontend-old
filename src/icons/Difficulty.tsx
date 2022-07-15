interface Props {
  className?: string;
  size?: number;
}

export default function Difficulty({ className, size = 24 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.02 15.5507V10.06H4.02V15.5507H3.02Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M8.5 15.5471V2.45H9.5V15.5471H8.5Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13.98 15.5496V7.50999H14.98V15.5496H13.98Z" />
    </svg>
  );
}

interface Props {
  className?: string;
  size?: number;
}

export default function Difficulty({ className, size = 24 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.67 20V12.7333H5.99V20H4.67Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 20V2.66666H13.32V20H12Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M19.3 20V9.36002H20.62V20H19.3Z" />
    </svg>
  );
}

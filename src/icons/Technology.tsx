interface Props {
  className?: string;
  size?: number;
}

export default function Technology({ className, size = 24 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.0801 6.96482L5.98839 7.90711L1.88637 11.859L5.95757 15.7813L5.04928 16.7236L0 11.859L5.0801 6.96482Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.1125 11.8585L18.0111 7.90711L18.9194 6.96482L24 11.8596L18.9394 16.7241L18.0321 15.7808L22.1125 11.8585Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.01688 19.2334L14.7853 3.92585L15.9826 4.45493L9.21408 19.7625L8.01688 19.2334Z"
      />
    </svg>
  );
}

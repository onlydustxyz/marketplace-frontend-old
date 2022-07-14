interface Props {
  className?: string;
  size?: number;
}

export default function Type({ className, size = 24 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" className={className}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.81784 5.42487L4.45734 12.5639L13.1517 12.5314L8.81784 5.42487ZM9.35885 4.39137C9.1128 3.98094 8.52361 3.98087 8.27745 4.39116L3.07 12.9169V13.5691L14.9287 13.5248L9.35885 4.39137Z"
      />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 4.5H2V3.5H16V4.5Z" />
    </svg>
  );
}

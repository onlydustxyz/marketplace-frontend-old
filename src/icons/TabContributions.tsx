type Props = {
  className?: string;
  size?: number;
};

export default function TabContributions({ className, size = 24 }: Props) {
  return (
    <svg viewBox="0 0 30 30" className={className} height={size} width={size}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.313 8H11.25V7h14.063v1ZM25.313 15.5H11.25v-1h14.063v1ZM25.313 23H11.25v-1h14.063v1ZM6.563 8H4.688V7h1.875v1ZM6.563 15.5H4.688v-1h1.875v1ZM6.563 23H4.688v-1h1.875v1Z"
      />
    </svg>
  );
}

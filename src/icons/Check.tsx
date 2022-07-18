type Props = {
  className?: string;
  size?: number;
};

export default function Check({ className, size = 24 }: Props) {
  return (
    <svg viewBox="0 0 22 22" className={className} height={size} width={size}>
      <path d="M6.63159 10.4561L9.78949 13.5263L15.4737 8" stroke="black" strokeWidth="2" fill="transparent" />
    </svg>
  );
}

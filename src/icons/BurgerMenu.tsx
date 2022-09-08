type Props = {
  className?: string;
  size?: number;
};

export default function BurgerMenu({ className, size = 24 }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} height={size} width={size}>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M23 4.5H1V3.5H23V4.5Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12.5L1 12.5L1 11.5L23 11.5V12.5Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M23 20.5H1V19.5H23V20.5Z" />
    </svg>
  );
}

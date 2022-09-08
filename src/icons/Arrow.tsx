type Props = {
  className?: string;
  size?: number | "auto";
};

export default function Arrow({ className, size = 24 }: Props) {
  return (
    <svg viewBox="0 0 22 22" className={className} height={size} width={size}>
      <path d="M24 11.5L14.0986 20L12.5657 18.4259L19.4429 12.6018H0L0 10.4375H19.4014L12.5657 4.61343L14.0986 3L24 11.5Z" />
    </svg>
  );
}

interface CrossProps {
  className?: string;
  size?: number;
}

export default function Cross({ className, size = 24 }: CrossProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} height={size} width={size}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6187 19.6187C19.277 19.9604 18.723 19.9604 18.3813 19.6187L0.38128 1.61871C0.0395709 1.27701 0.0395713 0.722986 0.38128 0.381278C0.722989 0.0395688 1.27701 0.0395684 1.61872 0.381278L19.6187 18.3813C19.9604 18.723 19.9604 19.277 19.6187 19.6187Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.381292 19.6187C0.0395829 19.277 0.0395829 18.723 0.381292 18.3813L18.3813 0.38128C18.723 0.0395709 19.277 0.0395713 19.6187 0.38128C19.9604 0.722989 19.9604 1.27701 19.6187 1.61872L1.61873 19.6187C1.27702 19.9604 0.723 19.9604 0.381292 19.6187Z"
      />
    </svg>
  );
}

type Props = {
  className?: string;
  size?: number;
};

export default function TabProjects({ className, size = 24 }: Props) {
  return (
    <svg viewBox="0 0 28 28" className={className} height={size} width={size}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.326 2.18a1.353 1.353 0 0 1 1.348 0l9.625 5.414A1.386 1.386 0 0 1 25 8.79v10.787h-.5l.5.003a1.387 1.387 0 0 1-.701 1.198h-.002l-9.623 5.414a1.352 1.352 0 0 1-1.348 0L3.703 20.78l-.001-.001A1.387 1.387 0 0 1 3 19.58V8.791a1.386 1.386 0 0 1 .702-1.197l.001-.001 9.623-5.413ZM24 19.577V8.796a.386.386 0 0 0-.195-.332l-9.628-5.417a.353.353 0 0 0-.354 0l-.004.003-9.624 5.413A.389.389 0 0 0 4 8.796v10.78a.386.386 0 0 0 .195.333l9.628 5.416a.353.353 0 0 0 .354 0l.004-.003 9.624-5.413a.39.39 0 0 0 .195-.332Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.184 8.102a.5.5 0 0 1 .68-.193l10.232 5.704L24.133 7.91a.5.5 0 0 1 .494.87l-10.282 5.84a.5.5 0 0 1-.49.002L3.377 8.783a.5.5 0 0 1-.193-.68Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.103 13.686a.5.5 0 0 1 .495.504L14.5 25.872a.5.5 0 1 1-1-.009l.098-11.681a.5.5 0 0 1 .505-.496Z"
      />
    </svg>
  );
}

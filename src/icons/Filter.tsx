type Props = {
  className?: string;
  size?: number;
};

export default function Filter({ className, size = 24 }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} height={size} width={size}>
      <path fillRule="evenodd" clipRule="evenodd" d="M23 4.5H18V3.5H23V4.5Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M23 20.5H17V19.5H23V20.5Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14 4.5H1V3.5H14V4.5Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M23 12.5L9 12.5V11.5L23 11.5V12.5Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5 12.5L1 12.5L1 11.5L5 11.5V12.5Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13 20.5H1V19.5H13V20.5Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 6C17.1046 6 18 5.10457 18 4C18 2.89543 17.1046 2 16 2C14.8954 2 14 2.89543 14 4C14 5.10457 14.8954 6 16 6ZM16 7C17.6569 7 19 5.65685 19 4C19 2.34315 17.6569 1 16 1C14.3431 1 13 2.34315 13 4C13 5.65685 14.3431 7 16 7Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14ZM7 15C8.65685 15 10 13.6569 10 12C10 10.3431 8.65685 9 7 9C5.34315 9 4 10.3431 4 12C4 13.6569 5.34315 15 7 15Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 22C16.1046 22 17 21.1046 17 20C17 18.8954 16.1046 18 15 18C13.8954 18 13 18.8954 13 20C13 21.1046 13.8954 22 15 22ZM15 23C16.6569 23 18 21.6569 18 20C18 18.3431 16.6569 17 15 17C13.3431 17 12 18.3431 12 20C12 21.6569 13.3431 23 15 23Z"
      />
    </svg>
  );
}

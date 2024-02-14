export default function Arrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
      <path
        d="M4 12.8H20"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M20 12.8C15.5817 12.8 12 9.21833 12 4.80005"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M20 12.8C15.5817 12.8 12 16.3817 12 20.8"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}

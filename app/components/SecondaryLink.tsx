import { Link } from "@remix-run/react";

export interface ISecondaryLinkProps {
  children: string;
  to: string;
  className?: string;
  dataQa?: string;
}

export default function SecondaryLink({
  children,
  to,
  className,
  dataQa,
}: ISecondaryLinkProps) {
  return (
    <Link
      to={to}
      data-qa={dataQa}
      className={`mr-2 box-border border-2  border-white py-3 px-6 hover:bg-gray-400 active:border-4 active:bg-gray-400 active:py-[10px] active:px-[22px] ${className}`}
    >
      {children}
    </Link>
  );
}

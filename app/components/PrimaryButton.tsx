export interface IButtonProps {
  children: string;
  className?: string;
  dataQa?: string;
  handleClick: () => void;
}

export default function PrimaryButton({
  children,
  handleClick,
  className,
  dataQa,
}: IButtonProps) {
  return (
    <button
      data-qa={dataQa}
      className={` box-border border-2 border-black  py-3 px-6 hover:bg-gray-200 active:border-4 active:bg-gray-200 active:py-[10px] active:px-[22px] ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

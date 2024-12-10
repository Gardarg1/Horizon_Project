import { ButtonHTMLAttributes, ReactElement } from 'react';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  className?: string;
  children: ReactElement;
}

export const MyButton = ({ onClick, className, children, ...props }: MyButtonProps) => {
  return (
    <button
      className={
        className +
        ' ' +
        'border-2 border-first px-2 py-1 font-bold text-first transition-all duration-300 hover:border-second hover:bg-second hover:text-white'
      }
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

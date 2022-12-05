import clsx from 'clsx';

export default function Button({ children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={clsx(
        'rounded p-2 text-black text-center font-bold hover:text-primary-500 bg-green-400 animated-underline',
        className
      )}
    >
      {children}
    </button>
  );
}

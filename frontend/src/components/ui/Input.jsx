import React from 'react';

const Input = React.forwardRef(
  (
    {
      type = 'text',
      placeholder = '',
      invalid = false,
      disabled = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    const baseClasses =
      'w-full min-h-9 px-2.5 py-1.5 text-sm rounded-md bg-surface/90 backdrop-blur-sm border border-divider text-text placeholder:text-text-secondary hover:border-text/45 focus:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const invalidClass = invalid ? 'border-status-rejected' : '';

    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseClasses} ${invalidClass} ${className}`}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;

export const Select = React.forwardRef(
  (
    {
      invalid = false,
      disabled = false,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const baseClasses =
      'w-full min-h-9 px-2.5 py-1.5 text-sm rounded-md bg-surface/90 backdrop-blur-sm border border-divider text-text placeholder:text-text-secondary hover:border-text/45 focus:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const invalidClass = invalid ? 'border-status-rejected' : '';

    return (
      <select
        ref={ref}
        disabled={disabled}
        className={`${baseClasses} ${invalidClass} ${className}`}
        {...rest}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';
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
      'w-full min-h-9 px-2.5 py-1.5 text-sm rounded-md backdrop-blur-sm border transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const baseStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'var(--color-divider)',
      color: 'var(--color-text)',
    };
    const invalidStyle = invalid ? { borderColor: 'var(--status-rejected)' } : {};

    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        style={{ ...baseStyle, ...invalidStyle }}
        className={`${baseClasses} ${className} placeholder:text-text-secondary hover:border-text/45 focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent`}
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
      'w-full min-h-9 px-2.5 py-1.5 text-sm rounded-md backdrop-blur-sm border transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const baseStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'var(--color-divider)',
      color: 'var(--color-text)',
    };
    const invalidStyle = invalid ? { borderColor: 'var(--status-rejected)' } : {};

    return (
      <select
        ref={ref}
        disabled={disabled}
        style={{ ...baseStyle, ...invalidStyle }}
        className={`${baseClasses} ${className} placeholder:text-text-secondary hover:border-text/45 focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent`}
        {...rest}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';
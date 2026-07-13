import React from 'react';

const Textarea = React.forwardRef(
  (
    {
      placeholder = '',
      invalid = false,
      disabled = false,
      rows = 4,
      className = '',
      ...rest
    },
    ref
  ) => {
    const baseClasses =
      'w-full min-h-[90px] px-2.5 py-1.5 text-sm rounded-md backdrop-blur-sm border transition-colors disabled:opacity-50 disabled:cursor-not-allowed resize-y';
    const baseStyle = {
      backgroundColor: '#ffffff20',
      borderColor: 'var(--color-divider)',
      color: 'var(--color-text)',
    };
    const invalidStyle = invalid ? { borderColor: 'var(--status-rejected)' } : {};

    return (
      <textarea
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        style={{ ...baseStyle, ...invalidStyle }}
        className={`${baseClasses} ${className} placeholder:text-text-secondary hover:border-text/45 focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent`}
        {...rest}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
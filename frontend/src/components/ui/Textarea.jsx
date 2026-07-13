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
      'w-full min-h-[90px] px-2.5 py-1.5 text-sm rounded-md bg-surface/90 backdrop-blur-sm border border-divider text-text placeholder:text-text-secondary hover:border-text/45 focus:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed resize-y';
    const invalidClass = invalid ? 'border-status-rejected' : '';

    return (
      <textarea
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`${baseClasses} ${invalidClass} ${className}`}
        {...rest}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
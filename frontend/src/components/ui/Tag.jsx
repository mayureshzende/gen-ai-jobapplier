import React from 'react';

const variantClasses = {
  accent: 'bg-accent/10 text-accent',
  'accent-2': 'bg-accent-2/10 text-accent-2',
  neutral: 'bg-surface-alt text-text-secondary',
  outline: 'border border-accent text-accent bg-transparent',
  status: '',
};

const sizeClasses = {
  sm: 'px-2.5 py-0.5 text-[11px]',
  md: 'px-3 py-1 text-xs',
};

const Tag = React.forwardRef(
  (
    {
      variant = 'neutral',
      size = 'sm',
      color = null,
      style: inlineStyle = null,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center rounded-full tracking-wide leading-normal font-medium';
    const variantClass = variantClasses[variant] || variantClasses.neutral;
    const sizeClass = sizeClasses[size] || sizeClasses.sm;
    const combinedStyle =
      variant === 'status' && inlineStyle ? inlineStyle : color ? { backgroundColor: color.bg, color: color.text } : {};

    return (
      <span
        ref={ref}
        className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
        style={combinedStyle}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
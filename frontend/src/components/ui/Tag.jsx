import React from 'react';

const getVariantStyle = (variant) => {
  switch (variant) {
    case 'accent':
      return {
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        color: 'var(--color-accent)',
      };
    case 'neutral':
      return {
        backgroundColor: 'var(--color-surface-alt)',
        color: 'var(--color-text-secondary)',
      };
    case 'outline':
      return {
        borderColor: 'var(--color-accent)',
        color: 'var(--color-accent)',
        backgroundColor: 'transparent',
        border: '1px solid',
      };
    case 'status':
      return {};
    default:
      return {};
  }
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
    const sizeClass = sizeClasses[size] || sizeClasses.sm;
    const borderClass = variant === 'outline' ? 'border' : '';
    const variantStyle = variant === 'status' && inlineStyle ? inlineStyle : color ? { backgroundColor: color.bg, color: color.text } : getVariantStyle(variant);

    return (
      <span
        ref={ref}
        className={`${baseClasses} ${borderClass} ${sizeClass} ${className}`}
        style={variantStyle}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
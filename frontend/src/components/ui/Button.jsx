import React from 'react';

const getVariantStyle = (variant) => {
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: 'var(--color-accent)',
        color: 'white',
      };
    case 'secondary':
      return {
        borderColor: 'var(--color-divider)',
        color: 'var(--color-text)',
        backgroundColor: 'transparent',
      };
    case 'ghost':
      return {
        color: 'var(--color-accent)',
        backgroundColor: 'transparent',
      };
    case 'icon':
      return {
        width: '34px',
        height: '34px',
        padding: '0',
      };
    default:
      return {};
  }
};

const sizeClasses = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-2 text-sm',
};

const Button = React.forwardRef(
  (
    {
      variant = 'secondary',
      size = 'md',
      as: Component = 'button',
      disabled = false,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center gap-1.5 rounded-md font-semibold cursor-pointer transition-colors disabled:opacity-45 disabled:cursor-not-allowed select-none';
    const variantStyle = getVariantStyle(variant);
    const sizeClass = sizeClasses[size] || sizeClasses.md;
    const borderClass = variant === 'secondary' ? 'border' : '';

    return (
      <Component
        ref={ref}
        disabled={disabled}
        style={variantStyle}
        className={`${baseClasses} ${borderClass} ${sizeClass} ${className}`}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
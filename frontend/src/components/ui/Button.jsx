import React from 'react';

const variantClasses = {
  primary: 'bg-accent text-white hover:bg-accent-hover active:bg-accent-hover',
  secondary: 'border border-divider text-text hover:bg-text/5 active:bg-text/10 bg-transparent',
  ghost: 'text-accent px-2 hover:bg-accent/10 active:bg-accent/15 bg-transparent',
  icon: 'w-8.5 h-8.5 p-0',
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
    const variantClass = variantClasses[variant] || variantClasses.secondary;
    const sizeClass = sizeClasses[size] || sizeClasses.md;

    return (
      <Component
        ref={ref}
        disabled={disabled}
        className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
import React from 'react';

const elevationClasses = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  none: '',
};

const Card = React.forwardRef(
  (
    {
      elevation = 'none',
      interactive = false,
      as: Component = 'div',
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const baseClasses = 'flex flex-col gap-2 p-4 rounded-md backdrop-blur-sm border';
    const elevationClass = elevationClasses[elevation] || elevationClasses.none;
    const interactiveClass = interactive ? 'hover:shadow-md transition-shadow cursor-pointer' : '';
    const baseStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'var(--color-divider)',
    };

    return (
      <Component
        ref={ref}
        style={baseStyle}
        className={`${baseClasses} ${elevationClass} ${interactiveClass} ${className}`}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

const CardKicker = ({ children, className = '' }) => (
  <span style={{ color: 'var(--color-accent)' }} className={`text-[10px] tracking-widest uppercase ${className}`}>{children}</span>
);

const CardTitle = ({ children, className = '' }) => (
  <h4 className={`font-bold text-[17px] leading-tight ${className}`}>{children}</h4>
);

const CardBody = ({ children, className = '' }) => (
  <p style={{ color: 'var(--color-text-secondary)' }} className={`text-[13px] opacity-80 flex-1 m-0 ${className}`}>{children}</p>
);

const CardMeta = ({ children, className = '' }) => (
  <div style={{ color: 'var(--color-text-secondary)' }} className={`flex items-center gap-1.5 text-[11px] ${className}`}>{children}</div>
);

Card.Kicker = CardKicker;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Meta = CardMeta;

export default Card;
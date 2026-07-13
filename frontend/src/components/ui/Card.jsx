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
    const baseClasses = 'flex flex-col gap-2 p-4 rounded-md bg-surface/90 backdrop-blur-sm border border-divider/60';
    const elevationClass = elevationClasses[elevation] || elevationClasses.none;
    const interactiveClass = interactive ? 'hover:shadow-md transition-shadow cursor-pointer' : '';

    return (
      <Component
        ref={ref}
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
  <span className={`text-[10px] tracking-widest uppercase text-accent ${className}`}>{children}</span>
);

const CardTitle = ({ children, className = '' }) => (
  <h4 className={`font-bold text-[17px] leading-tight ${className}`}>{children}</h4>
);

const CardBody = ({ children, className = '' }) => (
  <p className={`text-[13px] opacity-80 flex-1 m-0 ${className}`}>{children}</p>
);

const CardMeta = ({ children, className = '' }) => (
  <div className={`flex items-center gap-1.5 text-[11px] text-text-secondary ${className}`}>{children}</div>
);

Card.Kicker = CardKicker;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Meta = CardMeta;

export default Card;
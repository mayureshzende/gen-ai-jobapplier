
const SegmentedControl = ({ options = [], value, onChange, name = 'segment', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1.5 text-[13px]',
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      role="radiogroup"
      className={`inline-flex rounded-md border border-divider overflow-hidden ${className}`}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center gap-1.5 ${sizeClass} cursor-pointer border-l border-divider first:border-l-0 has-[:checked]:bg-accent has-[:checked]:text-white hover:not-has-[:checked]:bg-text/5 transition-colors`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default SegmentedControl;

import Tag from './Tag';

const FormField = ({ label, htmlFor, error, hint, required = false, children, className = '' }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={htmlFor} className="text-xs font-medium text-text-secondary flex items-baseline gap-2">
          {label}
          {required && <Tag variant="outline" size="sm">Required</Tag>}
        </label>
      )}
      {children}
      {error && <p className="text-[11px] text-status-rejected">{error}</p>}
      {hint && !error && <p className="text-[11px] text-text-secondary">{hint}</p>}
    </div>
  );
};

export default FormField;
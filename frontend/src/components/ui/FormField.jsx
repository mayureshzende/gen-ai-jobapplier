import Tag from './Tag';

const FormField = ({ label, htmlFor, error, hint, required = false, children, className = '' }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={htmlFor} style={{ color: 'var(--color-text-secondary)' }} className="text-xs font-medium flex items-baseline gap-2">
          {label}
          {required && <Tag variant="outline" size="sm">Required</Tag>}
        </label>
      )}
      {children}
      {error && <p style={{ color: 'var(--status-rejected)' }} className="text-[11px]">{error}</p>}
      {hint && !error && <p style={{ color: 'var(--color-text-secondary)' }} className="text-[11px]">{hint}</p>}
    </div>
  );
};

export default FormField;
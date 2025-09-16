interface ReusableTooltipProps<T> {
  active?: boolean;
  payload?: T[];
  label?: string;
  // Optionally pass totalHours, config objects, or other auxiliary data
  renderContent: (props: {
    active?: boolean;
    payload?: T[];
    label?: string;
  }) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  // You can add more props for needs like theme, backdrop, etc.
}

const ReusableTooltip = <T,>({
  active,
  payload,
  label,
  renderContent,
  className = "",
  style,
  ...restProps
}: ReusableTooltipProps<T>) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      className={`bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg ${className}`}
      style={style}
    >
      {renderContent({ active, payload, label, ...restProps })}
    </div>
  );
};
export default ReusableTooltip;

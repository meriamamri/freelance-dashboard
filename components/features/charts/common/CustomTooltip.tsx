import { PayloadType } from "@/components/features/charts/types/payloadType";

interface ReusableTooltipProps {
  active?: boolean;
  payload?: PayloadType[];
  label?: string;
  // Optionally pass totalHours, config objects, or other auxiliary data
  renderContent: (props: {
    payload?: PayloadType[];
    label?: string;
  }) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  // You can add more props for needs like theme, backdrop, etc.
}

const ReusableTooltip: React.FC<ReusableTooltipProps> = ({
  active,
  payload,
  label,
  renderContent,
  className = "",
  style,
  ...restProps
}) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      className={`bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg ${className}`}
      style={style}
    >
      {renderContent({ payload, label, ...restProps })}
    </div>
  );
};
export default ReusableTooltip;

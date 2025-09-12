import { PayloadType } from "@/components/features/charts/types/payloadType";

const RenderTooltipContent = ({
  payload,
  label,
}: {
  payload?: PayloadType[];
  label?: string;
}) => {
  if (!payload) return null;
  return (
    <>
      <p className="font-medium">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} style={{ color: entry.color }} className="text-sm">
          {entry.name}: ${entry.value.toLocaleString()}
        </p>
      ))}
      {payload && payload && (
        <p className="text-sm font-medium text-muted-foreground border-t pt-1 mt-1">
          Net: ${(payload[0].value - payload[0].value).toLocaleString()}
        </p>
      )}
    </>
  );
};

export default RenderTooltipContent;

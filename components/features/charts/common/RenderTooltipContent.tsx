const RenderTooltipContent = <T extends { name: string; value: number; color: string }>({
  payload,
  label,
}: {
  payload?: T[];
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
      {payload && payload.length >= 2 && (
        <p className="text-sm font-medium text-muted-foreground border-t pt-1 mt-1">
          Net: ${(payload[0].value - payload[1].value).toLocaleString()}
        </p>
      )}
    </>
  );
};

export default RenderTooltipContent;

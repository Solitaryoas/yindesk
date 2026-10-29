const formatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function LastUpdated({ date }: { date?: Date }) {
  if (!date) return null;

  return (
    <p className="text-sm text-fd-muted-foreground">
      最后编辑于{" "}
      <time dateTime={date.toISOString()}>{formatter.format(date)}</time>
    </p>
  );
}

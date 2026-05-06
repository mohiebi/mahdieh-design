export function Marquee() {
  const items = [
    "Brand Strategy", "Visual Identity", "UI / UX Design",
    "Art Direction", "Logo Design", "Design Systems", "Creative Leadership"
  ];
  const row = [...items, ...items];
  return (
    <div className="border-y border-border overflow-hidden bg-foreground text-background py-6">
      <div className="flex gap-12 marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-display text-3xl md:text-5xl italic flex items-center gap-12">
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

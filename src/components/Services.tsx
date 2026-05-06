export function Services() {
  const services = [
    { n: "01", t: "Brand Strategy", d: "Positioning, naming, narrative and verbal identity that gives a brand its compass." },
    { n: "02", t: "Visual Identity Systems", d: "Logos, marks, typography and design systems built to scale across every touchpoint." },
    { n: "03", t: "UI / UX Design", d: "Product interfaces, marketing sites and digital experiences focused on clarity and intent." },
    { n: "04", t: "Art Direction", d: "Campaigns, packaging and editorial direction that translate strategy into culture." },
  ];
  return (
    <section id="services" className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
          ✦ Services
        </div>
        <h2 className="font-display text-5xl md:text-7xl mb-16 max-w-3xl">
          A practice for ambitious brands.
        </h2>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {services.map((s) => (
            <div key={s.n} className="bg-background p-10 lg:p-14 group hover:bg-accent hover:text-accent-foreground transition-colors">
              <div className="font-mono text-xs tracking-[0.25em] opacity-60">{s.n}</div>
              <h3 className="font-display text-3xl md:text-4xl mt-6">{s.t}</h3>
              <p className="mt-4 max-w-md leading-relaxed opacity-80">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

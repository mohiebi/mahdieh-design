export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 px-6 lg:px-12 grain overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-10 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-px w-10 bg-foreground" />
          Available for select projects · 2026
        </div>

        <h1 className="font-display text-[clamp(2.5rem,9vw,9rem)] leading-[0.95] tracking-tight">
          Brands that <em className="text-accent not-italic font-normal">think</em>,
          <br />
          identities that <em className="italic">resonate</em>.
        </h1>

        <div className="mt-16 grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-5 lg:col-start-7 text-lg lg:text-xl leading-relaxed text-muted-foreground">
            I'm <span className="text-foreground">Mahdieh Baghoolizadeh</span> — a brand strategist,
            visual identity designer and art director. Founder of{" "}
            <a href="https://nexainc.co" className="underline decoration-accent decoration-2 underline-offset-4 text-foreground">Nexa Studio</a>,
            collaborating with clients across Canada, the UK and the Middle East.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-10">
          {[
            ["07+", "Years of practice"],
            ["40+", "Brands shaped"],
            ["3", "Continents"],
            ["1", "Studio founded"],
          ].map(([k, v]) => (
            <div key={v}>
              <div className="font-display text-4xl lg:text-5xl">{k}</div>
              <div className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

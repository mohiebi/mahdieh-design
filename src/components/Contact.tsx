export function Contact() {
  const links = [
    ["LinkedIn", "mahdiehdesign", "https://linkedin.com/in/mahdiehdesign"],
    ["Behance", "mahdiehdesign", "https://behance.net/mahdiehdesign"],
    ["Instagram", "mahhdiehh", "https://instagram.com/mahhdiehh"],
    ["Telegram", "artdirector_mah", "https://t.me/artdirector_mah"],
  ];
  return (
    <section id="contact" className="px-6 lg:px-12 py-24 lg:py-40 grain">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
          ✦ Let's collaborate
        </div>
        <h2 className="font-display text-[clamp(3rem,11vw,11rem)] leading-[0.9] tracking-tight">
          Have a brand
          <br />
          worth <em className="text-accent not-italic">building</em>?
        </h2>

        <div className="mt-16 flex flex-wrap items-center gap-6">
          <a
            href="mailto:hello@nexainc.co"
            className="inline-flex items-center gap-3 bg-foreground text-background rounded-full px-8 py-5 font-display text-xl hover:bg-accent transition-colors"
          >
            hello@nexainc.co
            <span aria-hidden>→</span>
          </a>
          <span className="text-muted-foreground font-mono text-xs uppercase tracking-[0.25em]">
            Avg. reply within 24h
          </span>
        </div>

        <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-border pt-10">
          {links.map(([label, handle, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="group">
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
              <div className="font-display text-2xl mt-2 group-hover:text-accent transition-colors">@{handle} ↗</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-6 lg:px-12 py-10 border-t border-border">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        <div>© {new Date().getFullYear()} Mahdieh Baghoolizadeh — All rights reserved</div>
        <div>Nexa Studio · Create · Be · Inspire</div>
      </div>
    </footer>
  );
}

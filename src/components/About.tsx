export function About() {
  const experience = [
    ["2024 — 2026", "Founder · Brand Strategy", "Nexa Studio"],
    ["2023", "Brand Designer", "Milanco Studio · Toronto"],
    ["2023", "Art Director", "Wilma Studio"],
    ["2022 — 2023", "Senior Designer", "Freelance"],
    ["2019 — 2022", "Head Designer", "Narvan Agency"],
  ];
  const education = [
    ["2026", "UI/UX Product Design", "Zero to Mastery"],
    ["2020 — 2022", "Master of Handi Crafts", "Art University of Isfahan"],
    ["2021", "Brand Design Certification", "Vand International"],
    ["2014 — 2019", "Bachelor of Graphic Design", "Art University of Isfahan"],
  ];

  return (
    <section id="about" className="px-6 lg:px-12 py-24 lg:py-32 bg-foreground text-background">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="text-xs font-mono uppercase tracking-[0.25em] opacity-60 mb-4">
            ✦ About
          </div>
          <h2 className="font-display text-5xl md:text-6xl leading-[1.05]">
            Strategy meets <em className="text-accent not-italic">aesthetics</em>, in service of growth.
          </h2>
          <p className="mt-8 text-lg leading-relaxed opacity-80">
            With academic foundations in graphic design and advanced art studies — and over seven
            years across agencies, studios and independent practice — I bring both creativity and
            structure to every collaboration. My work pairs strategic thinking with user-centered
            craft to build identities and digital products that connect with people and support
            business outcomes.
          </p>
          <p className="mt-6 leading-relaxed opacity-60">
            Open to remote opportunities, freelance projects and international collaborations.
          </p>
        </div>

        <div className="lg:col-span-7 lg:pl-12 grid sm:grid-cols-2 gap-12">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] opacity-60 mb-6">Experience</h3>
            <ul className="space-y-6">
              {experience.map(([year, role, place]) => (
                <li key={role} className="border-t border-background/15 pt-4">
                  <div className="text-xs font-mono opacity-60">{year}</div>
                  <div className="font-display text-xl mt-1">{role}</div>
                  <div className="text-sm opacity-70 italic">{place}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] opacity-60 mb-6">Education</h3>
            <ul className="space-y-6">
              {education.map(([year, role, place]) => (
                <li key={role} className="border-t border-background/15 pt-4">
                  <div className="text-xs font-mono opacity-60">{year}</div>
                  <div className="font-display text-xl mt-1">{role}</div>
                  <div className="text-sm opacity-70 italic">{place}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

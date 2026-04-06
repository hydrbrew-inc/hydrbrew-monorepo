import Link from "next/link";
import { IntelButton } from "./IntelButton";

const ingredients = [
  {
    title: "Caffeine",
    tag: "CLEAN ENERGY SUBSTRATE",
    body: "75mg Precision-Dosed Coffee Extract: A stabilized caffeine signal engineered to bypass the anxiety-cascade of traditional brews. Optimized for the 2-4PM performance window.",
  },
  {
    title: "L-Theanine",
    tag: "SMOOTH ACTIVATION",
    body: "Delivers 200 mg of high-purity (+95%) L-Theanine, an amino acid that human studies indicate can promote increased alpha brain wave activity linked to relaxed alertness.",
  },
  {
    title: "Lion's Mane",
    tag: "NEUROGENESIS CATALYST",
    body: "8:1 Lion's Mane extract—used in studies exploring potential cognitive and mood support in adults.",
  },
  {
    title: "Sodium",
    tag: "HYDRATION SUPPORT",
    body: "Includes 75 mg sodium to contribute to the electrolyte stack's support for hydration and flavor enhancement, as part of maintaining normal body fluid balance.",
  },
  {
    title: "Potassium",
    tag: "HYDRATION SUPPORT",
    body: "Includes 100 mg potassium—an intracellular electrolyte shown in physiological studies to help regulate osmotic pressure and fluid balance inside cells.",
  },
  {
    title: "Magnesium",
    tag: "CALM RESPONSE",
    body: "Contains 65 mg magnesium to contribute to the electrolyte stack's support for normal relaxation processes and electrolyte/fluid balance in healthy adults.",
  },
] as const;

const researchLinks = [
  { href: "https://pubmed.ncbi.nlm.nih.gov/", label: "[SRC: PUBMED_18296328 ]" },
  { href: "https://link.springer.com/", label: "[SRC: SPRINGER_31-28 ]" },
  { href: "https://www.ncbi.nlm.nih.gov/pmc/", label: "[SRC: PMC_5532289 ]" },
  { href: "https://www.ncbi.nlm.nih.gov/pmc/", label: "[SRC: PMC_5452159 ]" },
  { href: "https://www.researchgate.net/", label: "[SRC: RESEARCHGATE_399181646 ]" },
] as const;

export function HowItWorksSection() {
  return (
    <section className="lp-section" id="science" aria-labelledby="lp-how-title">
      <div className="lp-inner">
        <div className="lp-row-actions" style={{ justifyContent: "space-between" }}>
          <h2 id="lp-how-title" className="lp-h2 lp-mb-0">
            How It Works
          </h2>
          <IntelButton />
        </div>
        <p className="lp-lede">
          Six clinically-validated compounds in precise ratios, engineered to upgrade your operating
          system.
        </p>
        <p className="lp-text">
          <Link href="#" className="lp-cyan">
            Sweetened with Coconut Sugar
          </Link>
        </p>
        <div className="lp-row-actions">
          <button type="button" className="lp-btn-primary">
            RESEARCH.md [3]
          </button>
          <button type="button" className="lp-btn-primary">
            [SECURE YOUR 12-PACK]
          </button>
          <button type="button" className="lp-btn-primary">
            +1 You
          </button>
          <button type="button" className="lp-btn-primary">
            ^UPLINK
          </button>
        </div>
        <div className="lp-research-row lp-mt">
          <Link href="#" className="lp-link-chip">
            Sugar-sweetened beverage reduction studies
          </Link>
          <Link href="#" className="lp-link-chip">
            Cognitive performance and alertness synergy
          </Link>
          <Link href="#" className="lp-link-chip">
            Neuroprotective and cognitive enhancement effects
          </Link>
        </div>

        <div className="lp-card-grid lp-card-grid--3 lp-mt">
          {ingredients.map((ing) => (
            <article key={ing.title} className="lp-card lp-card--ingredient">
              <div className="lp-row-actions" style={{ justifyContent: "flex-end", marginBottom: "0.5rem" }}>
                <IntelButton />
              </div>
              <h3 className="lp-card-title">{ing.title}</h3>
              <p className="lp-card-tag">{ing.tag}</p>
              <p className="lp-card-body">{ing.body}</p>
              <div className="lp-row-actions">
                <button type="button" className="lp-btn-primary" style={{ fontSize: "0.7rem", padding: "0.4rem 0.75rem" }}>
                  [SECURE YOUR 12-PACK]
                </button>
                <button type="button" className="lp-btn-primary" style={{ fontSize: "0.7rem", padding: "0.4rem 0.75rem" }}>
                  +1 You
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="lp-research-row lp-mt">
          {researchLinks.map((l) => (
            <Link key={l.label} href={l.href} className="lp-link-chip" target="_blank" rel="noreferrer">
              {l.label}
            </Link>
          ))}
        </div>
        <p className="lp-cyan lp-mt" style={{ fontWeight: 600 }}>
          No NFT required. Just the brew.
        </p>
      </div>
    </section>
  );
}

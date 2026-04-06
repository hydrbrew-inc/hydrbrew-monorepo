export function IntelButton({ label = "INTEL" }: { label?: string }) {
  return (
    <button type="button" className="lp-intel" aria-label={`Open ${label} briefing`}>
      <span aria-hidden>|||</span> {label}
    </button>
  );
}

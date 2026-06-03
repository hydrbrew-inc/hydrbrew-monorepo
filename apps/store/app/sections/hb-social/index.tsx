import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { useState } from "react";
import { Play, Instagram, Send } from "lucide-react";
import { useFetcher } from "react-router";

const mediaItems = [
  { id: 1, type: "image", caption: '"My afternoon ritual has never felt this good"' },
  { id: 2, type: "video", caption: "The perfect pour" },
  { id: 3, type: "image", caption: '"Finally, energy that lasts"' },
  { id: 4, type: "video", caption: "Flow state activated" },
];

const gridImage = "https://i.imgur.com/2kEymfr.png";

function HbSocial(props: HydrogenComponentProps) {
  const { ...rest } = props;
  const fetcher = useFetcher<{ ok: boolean }>();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const fd = new FormData();
    fd.set("email", email);
    fetcher.submit(fd, { action: "/api/klaviyo", method: "POST", encType: "multipart/form-data" });
    setEmail("");
  };

  return (
    <section {...rest} className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00FFFF]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[#00FFFF] text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: "'Roboto Mono',monospace" }}>COMMUNITY FEED // SOCIAL PROOF</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 leading-tight" style={{ fontFamily: "'Urbanist',sans-serif" }}>
            The Baseline<br /><span className="text-[#00FFFF]">Standard</span>
          </h2>
          <p className="text-lg text-white/60">Seen on the desks of high-resolution minds</p>
        </div>

        {/* Desktop grid */}
        <div className="relative max-w-7xl mx-auto">
          <div className="hidden md:grid md:grid-cols-4 gap-6">
            {mediaItems.map((item, index) => (
              <div key={item.id} className="group relative aspect-[9/16] bg-gradient-to-br from-[#00FFFF]/10 to-purple-500/10 rounded-2xl overflow-hidden border border-[#00FFFF]/20 cursor-pointer hover:border-[#00FFFF]/60 transition-all">
                <img src={gridImage} alt={`hydrbrew community — ${item.caption}`} className="w-full h-full object-cover" loading="lazy" />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                    <div className="w-16 h-16 bg-[#00FFFF]/20 backdrop-blur-md rounded-full flex items-center justify-center border border-[#00FFFF]/40">
                      <Play className="w-8 h-8 text-[#00FFFF] fill-[#00FFFF]" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-sm text-white/90">{item.caption}</p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/20 to-purple-500/20" />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile scroll */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
              {mediaItems.map((item) => (
                <div key={item.id} className="shrink-0 w-64 snap-center">
                  <div className="relative aspect-[9/16] bg-gradient-to-br from-[#00FFFF]/10 to-purple-500/10 rounded-2xl overflow-hidden border border-[#00FFFF]/20">
                    <img src={gridImage} alt={`hydrbrew community — ${item.caption}`} className="w-full h-full object-cover" loading="lazy" />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-14 h-14 bg-[#00FFFF]/20 backdrop-blur-md rounded-full flex items-center justify-center border border-[#00FFFF]/40">
                          <Play className="w-7 h-7 text-[#00FFFF] fill-[#00FFFF]" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                      <p className="text-sm text-white/90">{item.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Email + Instagram join block */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="bg-black border-2 border-[#00FFFF]/30 rounded-2xl p-8 md:p-12">
            <div className="text-[#00FFFF]/60 text-xs uppercase tracking-widest mb-4 text-center" style={{ fontFamily: "'Roboto Mono',monospace" }}>COHORT ACCESS // SIGNAL DROPS</div>
            <h3 className="text-4xl md:text-6xl text-white text-center mb-6" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 700 }}>Stay <span className="text-[#00FFFF]">Connected</span></h3>
            <p className="text-white/70 text-lg text-center mb-8" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Join the cohort for exclusive drops, early access, and daily optimization intel</p>
            <div className="text-center mb-8">
              <span className="text-2xl md:text-3xl text-white font-bold" style={{ fontFamily: "'Urbanist',sans-serif" }}>Refer 2+ Members </span>
              <span className="text-2xl md:text-3xl text-[#00FFFF] font-bold" style={{ fontFamily: "'Urbanist',sans-serif" }}>→ Unlock Rewards</span>
            </div>

            {fetcher.data?.ok ? (
              <div className="text-center text-[#00FFFF] font-mono py-4 mb-8">Thanks for joining the cohort! ✓</div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-8">
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1 px-6 py-4 bg-white/5 border border-[#00FFFF]/30 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#00FFFF] transition-colors" style={{ fontFamily: "'Space Grotesk',sans-serif" }} />
                <button type="submit" className="px-8 py-4 bg-[#00FFFF] text-black rounded-full hover:bg-[#00FFFF]/90 transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] flex items-center justify-center gap-2 whitespace-nowrap font-bold" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 700 }}>
                  Join Now<Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="pt-8 border-t border-[#00FFFF]/20">
              <a href="https://www.instagram.com/tryhydrbrew/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 text-white/70 hover:text-[#00FFFF] transition-all group">
                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-lg" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500 }}>Follow @hydrbrew on Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HbSocial;

export const schema = createSchema({
  type: "hb-social",
  title: "HB Social",
  settings: [],
  presets: {},
});

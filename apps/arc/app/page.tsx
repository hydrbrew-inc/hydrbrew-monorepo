'use client';
/* eslint-disable @next/next/no-img-element -- external character art URLs; parity with legacy ARC */
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

type StoryEntry = {
  title: string;
  subtitle: string;
  video: string;
  studioVideo?: string;
  revealVideo: string;
  image: string;
  studioCopy?: string;
  lore: string[];
  legacy: string;
  textColor?: string;
};

const STORY_IDS = ['zenara', 'vespara', 'zevon', 'luno'] as const;
type StoryId = (typeof STORY_IDS)[number];

const DISPLAY_NAME_BY_ID: Record<StoryId, string> = {
  zenara: 'Zenara',
  vespara: 'Vespara',
  zevon: 'Zevon',
  luno: 'Luno',
};

/** * HYDRACORE MASTER v9.4.0 - THE DEFINITIVE HIGH-FIDELITY BUILD
 * -------------------------------------------------------------------
 * RESTORED: Full operative lore, FlowCharge Studio sector, and Quadrant Modal.
 * LOGIC: Orb-to-Terminal linking, sequential shipping extraction.
 * UI: High-contrast typography,Indented Dossier blocks, and Mobile-Grid fixes.
 */

export default function Home() {
  // --- UI STATES ---
  const [activeStory, setActiveStory] = useState<StoryId | null>(null);
  const [showQuadrantModal, setShowQuadrantModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Added to fix build error
  const heroVideoRef = useRef<HTMLVideoElement>(null);
const [activeSector, setActiveSector] = useState<'briefing' | 'studio'>('briefing');
const [activeIntel, setActiveIntel] = useState<string | null>(null);
const [isDecrypting, setIsDecrypting] = useState(false);
// ADD THIS TO YOUR STATES BLOCK
const [formData, setFormData] = useState({
  fullName: '',
  street: '',
  city: '',
  state: '',
  zip: ''
});
  // --- CLEAN & UNIFIED TERMINAL STATES ---
  const [accessStatus, setAccessStatus] = useState<'locked' | 'granted'>('locked');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isComplete, setIsComplete] = useState(false); 
  const [passcode, setPasscode] = useState(''); //
  const [poolStats] = useState({ '1010': 25, '2020': 25, '3030': 25, '4040': 25 });
  // --- TERMINAL LOGIC ---
const handleTerminalSync = () => {
    // Only trigger if we have 4 digits and aren't already syncing/granted
    if (passcode.length !== 4 || accessStatus === 'granted' || isSyncing) return;
    
    setIsSyncing(true);
    
    setTimeout(() => {
      setIsSyncing(false);
      setAccessStatus('granted');
    }, 3000);
  };
  // --- LIFECYCLE LOGIC: PAUSE HERO ON MODAL OPEN ---
  useEffect(() => {
    if (!heroVideoRef.current) return;

    // Pauses the hero reel if a character story or the quadrant modal is active
    if (activeStory || showQuadrantModal) {
      heroVideoRef.current.pause();
    } else {
      // Resumes playback when modals are closed
      heroVideoRef.current.play().catch(() => {
        // Silently catch autoplay blocks from the browser
      });
    }
  }, [activeStory, showQuadrantModal]);
    // --- FINAL EXTRACTION LOGIC ---
  const handleFinalizeExtraction = () => {
    // Logic: Ensure all logistics fields are complete before proceeding
    const { fullName, street, city, state, zip } = formData;
    
    if (!fullName || !street || !city || !state || !zip) {
      alert("Extraction Failed: All logistics fields must be complete.");
      return;
    }

    // Capture the payload for later Supabase integration
    console.log("Extraction Payload Ready:", {
      operative_code: passcode,
      timestamp: new Date().toISOString(),
      logistics: formData
    });
    
    // Set success state
    setIsComplete(true);
  };  
  {/* REST OF YOUR SECTIONS (Hero, Characters, etc.) */}

  const stories: Record<StoryId, StoryEntry> = {
    zenara: {
      title: "Zenara: Director of Flow Dynamics",
      subtitle: "Zen Flow Quadrant",
      video: "https://jgvylbc0v39x0arv.public.blob.vercel-storage.com/Zenara%20Vercel%20Reel.mov",
      studioVideo: "https://jgvylbc0v39x0arv.public.blob.vercel-storage.com/Flow%20Charge%20Studio%20Vercel%20Reel.MOV",
      revealVideo: "https://jgvylbc0v39x0arv.public.blob.vercel-storage.com/Mission%20Intel%20Reveal%20Code%20Teaser.MOV",
      image: "https://i.imgur.com/giDeBcH.jpeg",
      
      studioCopy: "FlowCharge Studio sits at the pulsing core of Hydracore Base, the gleaming HQ of the HydrBrew empire. Floor-to-ceiling views of hydroponic gardens, smart mats that vibrate for perfect alignment, and lighting synced to your HRV—this isn’t just Pilates; it’s engineered serenity. Zenara runs the show with calm authority, blending dynamic flows with precision to “charge” energy systems and erase burnout.",
      lore: [
        "Zenara, elite Pilates instructor, rules FlowCharge Studio at HydraCore Base: mats are battlegrounds, core is currency.",
        "Discovered hydrbrew° on a brutal retreat: alkaline, effervescent, nootropic-charged coffee notes—jitter-free.",
        "Her disciples are Luno, Mars colonist & hydrbrew° founder, and Vespara, a neural genius.",
        "Mid-deepest downward dog, she whispers: 'I am Zenara. Your NFT is my living fragment. As the journey continues, I will reveal private breath protocols and guided flows. Additionally, early access codes only known only to my quadrant holders.'"
      ],
      legacy: "Legacy: hydrbrew° as elite mindfulness hydration—crash-proof victory over hamstrings & chaos. Even Mars overlords needs breathing reminders"
    },
    vespara: { 
      title: "Vespara: Chief Neural Integration Officer", 
      subtitle: "Vision Quadrant", 
      video: "https://jgvylbc0v39x0arv.public.blob.vercel-storage.com/Vespara%20Vercel%20Reel.mov", 
      revealVideo: "https://jgvylbc0v39x0arv.public.blob.vercel-storage.com/Mission%20Intel%20Reveal%20Code%20Teaser.MOV",
      image: "https://i.imgur.com/7rF3Rd5.jpeg", 
      textColor: "text-purple-400",
      lore: [
        "Vespara leads the Transhuman Augmentation Lab at HydraCore Base, optimizing brain-computer interfaces for human-AI symbiosis in extreme conditions.",
        "Found hydrbrew° at the transhuman summit: zero-sugar, subtle coffee echo, electrolytes, and nootropics.",
        "Upgrade instant. Cold fizz replaced mugs; caffeine-theanine sustained hyper-focus, no overload. Implant sensors turned sips into data streams, and alkaline clarity became protocol-coffee ritual reborn, chaos gone.",
        "Eyes faintly glowing, she says: 'I am Vespara. Your NFT carries my code. In the phases ahead, I will share NFT blueprints for NFT drops.'"
      ],
      legacy: "Legacy: hydrbrew° as transhuman hydration standard. Every sip revives coffee’s fire for eternal conquest."
    },
    zevon: { 
      title: "Zevon: Head of Human Optimization", 
      subtitle: "Optimization Lab", 
      video: "https://jgvylbc0v39x0arv.public.blob.vercel-storage.com/Zevon%20Vercel%20Reel.MOV", 
      revealVideo: "https://jgvylbc0v39x0arv.public.blob.vercel-storage.com/Mission%20Intel%20Reveal%20Code%20Teaser.MOV",
      image: "https://i.imgur.com/H43dZi2.jpeg", 
      textColor: "text-red-500",
      lore: [
        "Zevon runs the Optimization Lab at HydraCore Base—a biohacker fortress obsessed with space-ready metrics: radiation resistance, low-G muscle, and metabolic steel.",
        "During a 72-hour fast, he locked in hydrbrew°, the formula he perfected in Luno’s basement, dialing in the caffeine-to-L-theanine ratio.  First sip, Obviously.",
        "The shift was ruthless: alkaline fizz beat coffee’s chaos; electrolytes + L-theanine gave crash-proof focus and elite biomarkers. It revived coffee's fire, deleted the crashes, and powered is judging apps.",
        "His proclamation: 'I am Zevon. Your NFT is bound to my protocols. Track everything. We are just getting started.'"
      ],
      legacy: "Legacy: hydrbrew° as hydration for biological warfare—hacking entropy and outlasting rivals. Every sip revives coffee's triumph, weaponized, crash-proof. Immortality's fine; sharper jokes (and ignored hamstrings) make it better."
    },
    luno: { 
      title: "Luno: Lead Mission Engineer & Originator", 
      subtitle: "Stellar Frontier", 
      video: "https://jgvylbc0v39x0arv.public.blob.vercel-storage.com/Luno%20Vercel%20Reel.mov", 
      revealVideo: "https://jgvylbc0v39x0arv.public.blob.vercel-storage.com/Mission%20Intel%20Reveal%20Code%20Teaser.MOV",
      image: "https://i.imgur.com/xOlsna0.jpeg", 
      textColor: "text-orange-400",
      lore: [
        "Luno, a tank-built Mars engineer, survives brutal simulation domes needing perfect fuel for isolation. coffee powered his zero-G vigils—until dehydration and crashes hit like a failed landing.",
        "In his basement, Luno created hydrbrew°. Zevon later tuned the low-caffeine, nootropic, electrolytes, and adaptogen ratio.",
        "First Mars mission: smuggled an extra case. Crew stayed sharp, hydrbrew° deemed official Bev for Mars.",
        "He declares: 'I am Luno. Your NFT is my beacon on the frontier.  The longer you stand post, the closer we get to launch. Eyes on red horizon'"
      ],
      legacy: "Legacy: Snuck case locks hydrbrew° as multi-planetary hydration—stellar expansion and crash-proof. Every sip revives coffee’s pioneer fire for infinite frontiers. Mars needs Zenara’s breathing lessons—and Luno for hero mode."
    }
  };

 return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden pb-32">
      {/* --- AUDIO TOGGLE --- */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-8 right-8 z-[100] p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-all group"
      >
        {isMuted ? (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Unmute</span>
            <VolumeX className="w-5 h-5 text-white/60" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Mute</span>
            <Volume2 className="w-5 h-5 text-red-600" />
          </div>
        )}
      </button>



{/* --- HERO REEL & BASE LORE --- */}
      <section className="pt-24 text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter mb-8 uppercase text-glow-red italic">HYDRACORE</h1>
        
{/* --- HERO REEL CONTAINER: RESTORED ORIGINAL BOX LOOK --- */}
<div className="relative w-full max-w-5xl mx-auto mb-16 rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-2xl aspect-video group">
  <video 
    ref={heroVideoRef} 
    src="https://jgvylbc0v39x0arv.public.blob.vercel-storage.com/HydraCore%20Base_no%20Text%20Overlay-zcjbX8K2qluAsll3SZyoXw2aSWiIsm.Mov" 
    autoPlay 
    loop 
    muted={isMuted}
    playsInline 
    className="w-full h-full object-cover" // Fills the box edge-to-edge
  />

  {/* HUD-STYLE AUDIO TOGGLE - PINNED TO TOP RIGHT */}
  <button 
    onClick={() => setIsMuted(!isMuted)}
    className="absolute top-6 right-6 z-50 p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-all"
  >
    {isMuted ? (
      <VolumeX className="w-5 h-5 text-white/60" />
    ) : (
      <Volume2 className="w-5 h-5 text-red-600 animate-pulse" />
    )}
  </button>
</div>

        {/* NEURAL STATUS OVERRIDE - PLACED INDEPENDENTLY */}
        <div className="max-w-md mx-auto mb-16">
          <button 
            type="button"
            onClick={handleTerminalSync}
            className={`w-full py-8 flex flex-col items-center justify-center bg-black/40 rounded-3xl border transition-all cursor-pointer hover:bg-red-500/10 active:scale-95 relative z-50 pointer-events-auto ${accessStatus === 'granted' ? 'border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.2)]' : 'border-red-500/20'}`}
          >
            <span className="text-[10px] text-red-500/50 font-mono tracking-[0.3em] uppercase mb-1 italic">Neural Status</span>
            <span className={`font-mono text-2xl tracking-[0.4em] ${accessStatus === 'granted' ? 'text-red-600' : 'text-white'}`}>
              {accessStatus === 'granted' ? 'AUTHORIZED' : (passcode || '----')}
            </span>
          </button>
        </div>

        {/* LORE BLOCK */}
{/* LORE BLOCK */}
        <div className="max-w-4xl mx-auto mb-20 bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-md text-left border-l-4 border-l-red-600">
           <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light italic">
             Here, four archetypal heroes — <span className="text-white font-bold italic">Zenara, Vespara, Zevon, and Luno</span> — don’t just discover{" "}
             {/* THE GLOWING BRAND NAME */}
             <span className="text-red-500 font-black animate-brand-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">
               hydrbrew°
             </span>
             {" "}They live it. It is their shared ritual: a jitter-free, nootropic-packed elixir channeling <span className="text-cyan-400 font-bold">calm dominance and cognitive clarity</span>.
           </p>
           <p className="mt-6 text-zinc-400 italic font-mono text-lg border-t border-white/5 pt-6">
             Coffee’s noble ghost reborn: a phantom flavor that delivers sustained edge in every sip.
           </p>
        </div>

        {/* MODAL TRIGGER */}
        <button onClick={() => setShowQuadrantModal(true)} className="group flex flex-col items-center mx-auto mb-20 transition-all hover:scale-105">
          <p className="text-red-500 font-black text-lg uppercase tracking-[0.4em] mb-4">The Quadrant Series ►</p>
          <div className="w-24 h-px bg-red-600 transition-all group-hover:w-64" />
        </button>
      </section>

{/* --- CHARACTER GRID: CLEAN BUILD --- */}
      <section className="w-full max-w-7xl mx-auto px-4 pb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STORY_IDS.map((id) => (
          <div 
            key={id} 
            onClick={() => setActiveStory(id)} 
            className="group relative h-[600px] rounded-[2.5rem] overflow-hidden border border-white/5 cursor-pointer shadow-2xl transition-all hover:border-red-600/50"
          >
            <img src={stories[id].image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-10">
              <h3 className={`text-4xl font-black uppercase italic tracking-tighter ${stories[id].textColor ?? ''}`}>{id}</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">{stories[id].subtitle}</p>
            </div>
          </div>
        ))}
      </section>

{/* --- MODAL: QUADRANT MODAL (REEL + STORY) --- */}
{showQuadrantModal && (
  /* 1. Use flex-col and remove items-center to allow top-alignment on mobile */
  <div className="fixed inset-0 z-[2000] bg-black/98 backdrop-blur-3xl flex flex-col overflow-y-auto">
    
    {/* 2. STICKY HEADER: This ensures the Title and X never leave the screen */}
    <div className="sticky top-0 z-[2010] bg-black/95 backdrop-blur-md p-6 border-b border-red-600/20 flex justify-between items-center">
       <h2 className="text-3xl md:text-7xl font-black uppercase italic tracking-tighter text-white drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
         THE BASE CREW
       </h2>
       <button 
         onClick={() => setShowQuadrantModal(false)} 
         className="text-red-600 hover:text-white text-5xl md:text-6xl transition-colors h-12 w-12 flex items-center justify-center"
       >
         &times;
       </button>
    </div>

    {/* 3. SCROLLABLE CONTENT AREA */}
    <div className="max-w-4xl w-full mx-auto p-6 md:p-12 space-y-12 animate-in zoom-in duration-500">
      
      {/* THE REEL - Responsive aspect ratio */}
      <div className="relative aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl mt-4">
         <video 
           src="https://jgvylbc0v39x0arv.public.blob.vercel-storage.com/Quadrant%20Series%20Reel.mov" 
           autoPlay loop muted={isMuted} playsInline 
           className="w-full h-full object-cover opacity-80" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* LORE CONTENT with Brand Glow applied */}
      <div className="space-y-8 text-left pb-20">
        <div className="space-y-6 text-zinc-300 text-lg md:text-2xl font-light leading-relaxed">
          <p>
            Here, four archetypal heroes — <span className="text-white font-bold italic">Zenara, Vespara, Zevon, and Luno</span> — don’t just discover{" "}
            <span className="text-red-500 font-black animate-brand-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">
              hydrbrew°
            </span>
            . They live it, test it, and push it to its limits every single day as key operatives at the Base. They are the core DNA of{" "}
            <span className="text-red-500 font-black animate-brand-pulse">hydrbrew°</span>.
          </p>
          
          <p>With ~500 unique avatars per quadrant, owning one doesn’t just give you art — it makes you part of the Base crew.</p>
          
          <p className="text-red-600 font-black uppercase italic tracking-widest text-xl md:text-2xl pt-4 border-t border-white/5">
            LIVE THE LORE. YOU&rsquo;RE ONE OF THEM. THE BASE IS WAITING.
          </p>
        </div>
      </div>
    </div>
  </div>
)}

{/* --- MODAL: CHARACTER DOSSIER --- */}
      {activeStory && (
        <div className="fixed inset-0 z-[600] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="max-w-6xl w-full bg-zinc-950 p-8 md:p-16 rounded-[3rem] border border-white/10 overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in duration-300">
            
            {/* CLOSE BUTTON - RED GLOW ON HOVER */}
<button 
  onClick={() => { setActiveStory(null); setActiveSector('briefing'); }} 
  // Added sticky positioning and z-index to ensure it stays on top for mobile
  className="sticky top-4 right-4 z-[100] self-end text-red-600/60 hover:text-red-500 hover:rotate-90 transition-all text-6xl md:text-5xl mb-6 md:mb-10 bg-black/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center border border-red-600/20 active:scale-90"
>
  &times;
</button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
               
               {/* DYNAMIC VIDEO PLAYER */}
               <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-black shadow-2xl">
                  <video 
                    key={`${activeStory}-${activeSector}`} // CRITICAL: Forces reload for other characters
                    src={activeSector === 'briefing' ? stories[activeStory].video : stories[activeStory].studioVideo} 
                    autoPlay 
                    loop 
                    muted={isMuted} // Linked to your global audio toggle
                    playsInline 
                    className="w-full h-full object-cover" 
                  />
               </div>

               {/* CHARACTER INTEL */}
               <div className="space-y-10 text-left">
                  <h2 className={`text-5xl md:text-7xl font-black uppercase italic tracking-tighter ${stories[activeStory].textColor || 'text-white'} text-glow-red`}>
                    {stories[activeStory].title}
                  </h2>

                  {/* SECTOR TOGGLE */}
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setActiveSector('briefing')} 
                      className={`px-6 py-3 rounded-xl text-xs font-black uppercase border transition-all ${activeSector === 'briefing' ? 'bg-white text-black border-white' : 'border-white/10 text-zinc-500 hover:border-white/30'}`}
                    >
                      Briefing
                    </button>
                    
                    {/* ONLY SHOW STUDIO BUTTON IF DATA EXISTS */}
                    {stories[activeStory].studioVideo && (
                      <button 
                        onClick={() => setActiveSector('studio')} 
                        className={`px-6 py-3 rounded-xl text-xs font-black uppercase border transition-all ${activeSector === 'studio' ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'border-white/10 text-zinc-500 hover:border-cyan-500/30'}`}
                      >
                        FlowCharge Studio
                      </button>
                    )}
                  </div>

{/* LORE & LEGACY TEXT */}
<div className="space-y-6 text-zinc-300 text-lg md:text-xl font-light italic border-l-2 border-red-600/30 pl-8">
  {activeSector === 'briefing' ? (
    // Added optional chaining (?.) to prevent crashes if activeStory is null
    stories[activeStory]?.lore?.map((p: string, i: number) => {
      const characterName = DISPLAY_NAME_BY_ID[activeStory];

      const allTags: Record<string, string[]> = {
        Zenara: ["[ EQUILIBRIUM ]", "[ DISCOVERY ]", "[ RITUAL ]", "[ MANTRA ]"],
        Vespara: ["[ ARCHIVE ]", "[ VISION ]", "[ SYNAPSE ]", "[ DIRECTIVE ]"],
        Zevon: ["[ PROTOTYPE ]", "[ OPTIMIZE ]", "[ RESULTS ]", "[ PROTOCOL ]"],
        Luno: ["[ ORIGIN ]", "[ FORMULA ]", "[ STATUS ]", "[ COMMS ]"],
      };

      const tags = allTags[characterName] ?? ["[ INTEL ]"];

      // 2. Prevent split error on empty or undefined paragraphs
      if (!p) return null;

      const highlights = ["Luno", "Zenara", "Vespara", "Zevon", "hydrbrew°", "Mars", "NFT", "Zen Flow", "Vision", "zero-G", "nootropic"];

      return (
        <div key={i} className="animate-in slide-in-from-left duration-500 mb-8 last:mb-0">
          <span className="block font-mono text-[10px] text-red-600/70 tracking-[0.5em] mb-2 uppercase font-bold">
            {tags[i] || "[ DATA_POINT ]"}
          </span>
          
<p className="leading-relaxed">
  {p.split(' ').map((word, index) => {
    // 1. Check specifically for the brand name to add the pulse
    const isBrand = word.toLowerCase().includes("hydrbrew°");
    
    // 2. Check for other general highlights for the bold white look
    const isHighlighted = highlights.some(h => word.toLowerCase().includes(h.toLowerCase()));

    if (isBrand) {
      return (
        <span key={index} className="text-red-500 font-black animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">
          {word}{' '}
        </span>
      );
    }

    return (
      <span key={index} className={isHighlighted ? "text-white font-black not-italic" : ""}>
        {word}{' '}
      </span>
    );
  })}
</p>
        </div>
      );
    })
  ) : (
    <p className="animate-in slide-in-from-left duration-500">{stories[activeStory]?.studioCopy}</p>
  )}
  
  {/* Legacy Footer remains consistent */}
  <div className="pt-8 border-t border-white/5">
    <p className="text-white font-black uppercase tracking-tighter italic opacity-80 mb-6">
      {stories[activeStory].legacy}
    </p>

                      {/* --- REVEAL ACTION BUTTON --- */}
<button 
  type="button"
  aria-busy={isDecrypting}
  onClick={() => {
    setIsDecrypting(true);
    setTimeout(() => {
      setIsDecrypting(false);
      setActiveIntel(stories[activeStory].revealVideo);
    }, 1500);
  }}
  className="group relative flex items-center justify-between bg-black border border-red-600/40 p-5 rounded-2xl hover:bg-red-950/20 hover:border-red-500 transition-all w-full shadow-[0_0_25px_rgba(220,38,38,0.15)] overflow-hidden"
>
  {/* SHIMMER EFFECT */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
  
  <div className="flex items-center gap-4 relative z-10 text-left">
    <span className="text-2xl group-hover:rotate-12 transition-transform duration-500">🔒</span>
    <div>
      <span className="block text-white font-black text-sm uppercase tracking-[0.2em] group-hover:text-red-500 transition-colors">
        [ REVEAL MISSION INTEL ]
      </span>
      <span className="block text-[10px] text-red-900 font-mono tracking-tighter mt-1 uppercase">
        Neural_Link_Status: Encrypted
      </span>
    </div>
  </div>
  
  <span className="text-red-500 font-mono text-[10px] animate-pulse relative z-10 uppercase">
    ▶ Execute
  </span>
</button>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

{/* --- STATIC MISSION INTEL TERMINAL --- */}
      <section id="mission-intel" className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-32">
        <div className="bg-zinc-900/80 border-2 border-red-900/30 rounded-[3rem] p-8 md:p-16 backdrop-blur-xl shadow-2xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b border-white/10 pb-8">
            <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-red-600 italic">Mission Intel</h2>
            <p className="text-red-500 font-mono text-sm tracking-widest animate-pulse uppercase">
              System Status: {accessStatus === 'granted' ? 'Decrypted' : 'Encrypted'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* PROTOCOL INFO */}
            <div className="text-left space-y-12">
              <h3 className="text-white font-black text-3xl md:text-4xl uppercase tracking-tighter italic">Extraction Protocol</h3>
              <div className="space-y-6 font-mono text-base md:text-xl text-zinc-400">
                <p>1. Input your 4-digit operative code into the terminal.</p>
                <p>2. Verify neural calibration and medallion availability.</p>
                <p>3. Submit logistics for physical extraction.</p>
              </div>
            </div>
            {/* MISSION INTEL ACTION */}


            {/* INTERACTIVE KEYPAD & LOADER */}
            <div className="max-w-md mx-auto w-full p-10 bg-black/60 border border-red-900/40 rounded-[3rem] backdrop-blur-xl relative z-50">
              
{/* MANUAL CODE INPUT */}
{!isComplete && (
  <div className="relative group">
    <input 
      type="text" 
      value={passcode} 
      onChange={(e) => {
        const val = e.target.value.replace(/[^0-9]/g, ''); // Numeric only
        if (val.length <= 4) setPasscode(val);
      }}
      // Added tracking-widest and specific font-mono for the look on screen
      className="w-full mb-6 bg-zinc-900/50 border border-white/10 p-5 rounded-2xl text-white font-mono text-center text-4xl uppercase outline-none focus:border-red-600 focus:bg-red-950/10 transition-all placeholder-zinc-800 tracking-[0.5em]"
      placeholder="----" // Shows empty slots instead of numbers
      disabled={accessStatus === 'granted' || isSyncing}
    />
  </div>
)}

<button 
  type="button"
  onClick={handleTerminalSync}
  className={`w-full mb-8 h-32 flex flex-col items-center justify-center bg-black/40 rounded-3xl border transition-all z-[60] pointer-events-auto ${accessStatus === 'granted' ? 'border-red-600' : 'border-red-500/20'}`}
>
  <span className="text-[10px] text-red-500/50 font-mono tracking-[0.3em] uppercase mb-2 italic">Neural Status</span>
  <span className={`font-mono text-xl md:text-3xl tracking-[0.2em] md:tracking-[0.4em] ${accessStatus === 'granted' ? 'text-red-600' : 'text-white'}`}>
    {/* text-xl on mobile, text-3xl on desktop fixes the clipping */}
    {accessStatus === 'granted' ? 'AUTHORIZED' : passcode.length === 4 ? 'READY' : 'INPUT CODE'}
  </span>
</button>

{/* RED LINE LOADER */}
              {isSyncing && (
                <div className="space-y-4 py-6 animate-flicker">
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 animate-progress"></div>
                  </div>
                  <p className="text-[10px] text-red-500 font-mono text-center uppercase tracking-[0.3em] italic">
                    Calibrating Neural Link...
                  </p>
                </div>
              )}

              {/* LOGISTICS CAPTURE OR SUCCESS MESSAGE */}
              {accessStatus === 'granted' && !isSyncing && (
                <div className="space-y-6 animate-in fade-in duration-700">
                   {!isComplete ? (
                      <>
                        <div className="p-4 border border-red-500/30 bg-red-500/5 rounded-2xl text-center mb-4">
                           <p className="text-red-500 font-black text-xs uppercase mb-1">Medallion Available</p>
                           <p className="text-xs text-zinc-400 font-mono italic">
                             {poolStats[passcode as keyof typeof poolStats] || 0}/25 units remaining
                           </p>
                        </div>
                        
{/* EXPANDED LOGISTICS: STATE-LINKED FOR GOOGLE SHEETS EXPORT */}
<div className="space-y-3 mb-6">
   <input 
     type="text" 
     placeholder="FULL NAME" 
     value={formData.fullName}
     onChange={(e) => setFormData({...formData, fullName: e.target.value.toUpperCase()})}
     className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white font-mono text-xs uppercase outline-none focus:border-red-500 transition-colors" 
   />
   
   <input 
     type="text" 
     placeholder="STREET ADDRESS" 
     value={formData.street}
     onChange={(e) => setFormData({...formData, street: e.target.value.toUpperCase()})}
     className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white font-mono text-xs uppercase outline-none focus:border-red-500 transition-colors" 
   />
   
   <div className="grid grid-cols-2 gap-3">
      <input 
        type="text" 
        placeholder="CITY" 
        value={formData.city}
        onChange={(e) => setFormData({...formData, city: e.target.value.toUpperCase()})}
        className="bg-white/5 border border-white/10 p-4 rounded-xl text-white font-mono text-xs uppercase outline-none focus:border-red-500 transition-colors" 
      />
      
      <div className="grid grid-cols-2 gap-3">
         <input 
           type="text" 
           placeholder="ST" 
           maxLength={2}
           value={formData.state}
           onChange={(e) => setFormData({...formData, state: e.target.value.toUpperCase()})}
           className="bg-white/5 border border-white/10 p-4 rounded-xl text-white font-mono text-xs uppercase outline-none focus:border-red-500 transition-colors" 
         />
         <input 
           type="text" 
           placeholder="ZIP" 
           value={formData.zip}
           onChange={(e) => setFormData({...formData, zip: e.target.value.replace(/\D/g, '')})}
           className="bg-white/5 border border-white/10 p-4 rounded-xl text-white font-mono text-xs uppercase outline-none focus:border-red-500 transition-colors" 
         />
      </div>
   </div>
</div>

<button 
  onClick={handleFinalizeExtraction} // Use the logic function we created
  className="w-full py-5 bg-red-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full shadow-xl shadow-red-500/20 hover:scale-[1.02] active:scale-95 transition-transform"
>
   Finalize Extraction
</button>
</>
) : (
/* --- MISSION SUCCESS STATE --- */
<div className="py-10 text-center space-y-6 animate-in zoom-in duration-500">
  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-red-600 bg-red-600/10 mb-4">
    <span className="text-red-600 text-4xl">✓</span>
  </div>
  <h3 className="text-white font-black text-3xl uppercase italic tracking-tighter">Mission Successful</h3>
  <p className="text-zinc-400 font-mono text-sm leading-relaxed">
    Your extraction request has been logged. <br/>
    Check your neural link for NFT claim instructions.
  </p>
  <button 
    onClick={() => { 
      setAccessStatus('locked'); 
      setIsComplete(false); 
      setPasscode(''); 
      setFormData({ fullName: '', street: '', city: '', state: '', zip: '' }); // Clean reset
    }}
    className="text-red-500 font-mono text-[10px] uppercase tracking-widest hover:text-white transition-colors"
  >
                          Reset Terminal
                        </button>
                      </div>
                   )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
{/* --- MISSION INTEL OVERLAY --- */}
      {activeIntel && (
        <div className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-0 md:p-4 backdrop-blur-2xl">
          <div className="relative w-full max-w-5xl h-full md:h-auto border-x md:border border-red-600/30 bg-zinc-950 shadow-[0_0_50px_rgba(220,38,38,0.3)] flex flex-col">
            
            {/* STICKY HEADER FOR MOBILE */}
            <div className="sticky top-0 z-[1010] flex justify-between items-center p-4 border-b border-red-600/20 bg-zinc-950/90 backdrop-blur-md">
              <span className="text-[10px] text-red-500 font-mono uppercase tracking-[0.3em] animate-pulse">
                Uplink Active
              </span>
              <button 
                onClick={() => {
                  setActiveIntel(null);
                  setIsMuted(false);
                }} 
                className="text-red-500 font-mono text-sm md:text-xs hover:text-white transition-colors border border-red-600/40 px-4 py-2 rounded bg-red-600/10 active:scale-95"
              >
                [ TERMINATE X ]
              </button>
            </div>

            {/* VIDEO CONTAINER */}
            <div className="flex-1 flex items-center justify-center bg-black">
              <video 
                autoPlay 
                controls 
                className="w-full max-h-[70vh] md:max-h-none aspect-video" 
                src={activeIntel} 
                onPlay={() => setIsMuted(true)}
              />
            </div>
          </div>
        </div>
      )}

{/* --- GLOBAL FOOTER: THE CAN REVEAL --- */}
<footer className="relative mt-40 pb-20 overflow-hidden bg-black border-t border-white/5">
  <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
    
    {/* THE CAN REEL - SCALED UP */}
    <div className="relative group mb-32">
      <div className="relative w-72 md:w-[28rem] aspect-[9/16] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_120px_rgba(239,68,68,0.2)] bg-zinc-900 transition-transform duration-700 group-hover:scale-105">
        <video 
          src="https://jgvylbc0v39x0arv.public.blob.vercel-storage.com/Footer%20Base%20Video.MP4" 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
      
      {/* Subtle bottom glow to anchor the video */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-red-600/5 blur-[100px] pointer-events-none" />
    </div>

{/* TERMINAL FOOTER DATA - ENHANCED READABILITY */}
<div className="w-full border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-[12px] md:text-[14px] font-mono text-zinc-400 tracking-[0.2em] uppercase">
  
  <div className="flex flex-col gap-2 group cursor-default">
    <p className="hover:text-white transition-colors duration-500">
      © 2026 HYDRBREW, INC. // SECTOR 04
    </p>
    <p className="text-red-600/60 font-black animate-pulse tracking-[0.4em] text-[10px]">
      Neural Link: Stable
    </p>
  </div>
  
  <div className="text-left md:text-right flex flex-col gap-2 group cursor-default">
    <p className="hover:text-white transition-colors duration-500">
      Crafted for the Archetypes
    </p>
    <p className="text-zinc-500 italic lowercase tracking-normal text-[14px] md:text-[16px] hover:text-red-500/80 transition-all duration-700">
      coffee’s noble ghost reborn
    </p>
  </div>
</div>
  </div>
</footer>

    </main>
  );
}

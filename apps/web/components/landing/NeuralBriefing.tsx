import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';
import { VRPortalModal } from './VRPortalModal';

// Briefing configuration
interface BriefingConfig {
  id: string;
  audioUrl: string;
  characterName: string;
  characterTitle: string;
  characterImage: string;
  transcript: Array<{ time: number; text: string }>;
  volumeBoost?: number; // Optional volume multiplier (default 2.25)
}

const briefings: Record<string, BriefingConfig> = {
  default: {
    id: 'default',
    audioUrl: 'https://stream.mux.com/x8P633iLGbj9002noR6TIlGKApOqHH00KKbjaP102uC2yc.m3u8',
    characterName: 'ZEVON',
    characterTitle: 'HUMAN OPT.',
    characterImage: 'https://i.imgur.com/H43dZi2.jpeg',
    transcript: [
      { time: 0, text: "This is Zevon. Head of Optimization here at HydrCore Base." },
      { time: 5, text: "If you're hearing this, you've breached the perimeter of the standard human experience." },
      { time: 10, text: "Welcome to the first day of your realignment." },
      { time: 16, text: "My work at the Base is simple: Eliminate friction." },
      { time: 20, text: "We've spent years analyzing the biological 'drag' created by modern life." },
      { time: 26, text: "The jitter. The crash. The mental fog." },
      { time: 30, text: "It's not just an inconvenience—it's a massive loss of cognitive arbitrage." },
      { time: 36, text: "That brings us to the protocol. hydrbrew°." },
      { time: 40, text: "We didn't just 'make a drink.' We rebuilt the coffee ritual from the molecular level up." },
      { time: 47, text: "We took the familiar essence of cold brew and fused it with a mineral-dense, alkaline foundation." },
      { time: 55, text: "The result? Maximum hydration. Calm focus." },
      { time: 59, text: "And a sustain that doesn't end in a collapse." },
      { time: 63, text: "It's what coffee should have been all along—a tool for the +1 You." },
      { time: 70, text: "Look around. Secure your serialized Medallion. Choose your Archetype." },
      { time: 76, text: "The Base is active, and the protocol is ready for deployment." },
      { time: 81, text: "Arbitrage the now... or get left in the noise." }
    ]
  },
  precursorModel: {
    id: 'precursorModel',
    audioUrl: 'https://stream.mux.com/eFX2jdyzPvArr8zOPApk02pG8M9bip00kYy5rz6015mBj4.m3u8',
    characterName: 'ZEVON',
    characterTitle: 'HUMAN OPT.',
    characterImage: 'https://i.imgur.com/H43dZi2.jpeg',
    volumeBoost: 3.6, // 360% boost for quieter Mux encoding
    transcript: [
      { time: 0, text: "Standard stimulants force a response. hydrbrew° facilitates one." },
      { time: 5, text: "We call this the Precursor Model: a precise stack of six clinically validated compounds designed to support a sustained flow state while minimizing systemic crashes." },
      { time: 18, text: "We lead with a specific ratio of L-Theanine to Caffeine. This isn't just energy—it's smoothed activation." },
      { time: 25, text: "By pairing high-purity L-Theanine with a low caffeine substrate, we aim to maintain mental alertness while keeping you in a state of parasympathetic flow." },
      { time: 37, text: "Next, we introduce Lion's Mane—a neurogenesis catalyst." },
      { time: 42, text: "This shifts the focus from a nervous system 'jolt' to cognitive clarity. This extract supports neural signaling and mood, helping you identify a stable focus curve." },
      { time: 53, text: "Finally, the hydration layer. A cellular-level infusion of Sodium, Potassium, and Magnesium." },
      { time: 60, text: "These intracellular electrolytes correlate with improved fluid balance and normal relaxation processes." },
      { time: 67, text: "While traditional coffee can deplete, hydrbrew° is engineered to restore." },
      { time: 73, text: "The data is tracked. The ratios are locked." },
      { time: 77, text: "This is the antidote to heavy. I am Zevon." },
      { time: 81, text: "Become an optimized human. Welcome to the +1." }
    ]
  },
  optimizedHuman: {
    id: 'optimizedHuman',
    audioUrl: 'https://stream.mux.com/PFLS2ndSxwUV1UhZyeTCvkau009tAMDcqRtFTWtzfE44.m3u8',
    characterName: 'ZEVON',
    characterTitle: 'HUMAN OPT.',
    characterImage: 'https://i.imgur.com/H43dZi2.jpeg',
    volumeBoost: 3.6, // 360% boost to match other Mux-encoded briefings
    transcript: [
      { time: 0, text: "This is Zevon again, reporting from HydrCore Base. Neural link established. Listen closely." },
      { time: 10, text: "Being optimized isn't a lifestyle. It's a baseline. You don't chase energy—you engineer it." },
      { time: 18, text: "Jitters are a weakness. Crashes are surrender. The second cup of coffee is a tax you pay to stay average. We don't pay taxes." },
      { time: 29, text: "Being a +1 Optimized means your HRV doesn't dip when the day gets hard. Your sleep score rises because you demand it. Your grip holds longer—because you refuse to let go." },
      { time: 43, text: "You're not following. You're leading. The red horizon isn't coming. It's already here—and you're already on it." },
      { time: 53, text: "hydrbrew° is the protocol. You are the proof." }
    ]
  },
  nftSeries: {
    id: 'nftSeries',
    audioUrl: 'https://stream.mux.com/ThiQ2zsX01EBVL1d74e01uo4OyB6v01QcIiooziUAm2uds.m3u8',
    characterName: 'ZEVON',
    characterTitle: 'HUMAN OPT.',
    characterImage: 'https://i.imgur.com/H43dZi2.jpeg',
    volumeBoost: 3.6, // 360% boost to match other Mux-encoded briefings
    transcript: [
      { time: 0, text: "You're not here for another caffeine spike. You're here for the Intel." },
      { time: 6, text: "We've spent months engineering a cognitive philosophy of performance without excess. A ritual that honors your coffee cue while anchoring your focus. Now, we're ready to reveal the data." },
      { time: 21, text: "Before hydrbrew° launches, we are initiating a closed-loop testing phase. We're looking for those who value verification over claims. Performance over hype." },
      { time: 34, text: "This is more than a waitlist. It's an initiation. Joining the mission grants you access to the HydrCore Digital Asset Series. Every archetype character NFT embodies a specific cognitive profile, a unique path to master the loop.  Your asset is the key to unlocking mission intel, early prototype access, and a seat at the table in our biological feedback loop." },
      { time: 63, text: "Share the mission to move up the rank. Unlock the game. Claim your asset." },
      { time: 70, text: "Welcome to the evolution of the afternoon ritual. hydrbrew°, verification is everything." }
    ]
  },
  manifesto: {
    id: 'manifesto',
    audioUrl: 'https://stream.mux.com/02RLEXoVeRiXQe201tznhTfOaxBdikAz02AUzlnvyUDhaI.m3u8',
    characterName: 'ZEVON',
    characterTitle: 'HUMAN OPT.',
    characterImage: 'https://i.imgur.com/H43dZi2.jpeg',
    volumeBoost: 3.6, // 360% boost to match other Mux-encoded briefings
    transcript: [
      { time: 0, text: "Our manifesto is simple: Measured. Verified. Optimized. We're moving past the era of anecdotal claims and marketing hype. Consumers are increasingly skeptical of claims. We are building the first verified human data loop." },
      { time: 21, text: "What you see here isn't a static graphic. It's a prototype of future performance gains. Real-time biometric stabilization. Atomic equilibrium, quantified and visualized." },
      { time: 36, text: "We are taking the lab into the field. Starting today, we are officially opening applications for our exclusive Beta Field Testing Group." },
      { time: 47, text: "Through our Oura integration, you can monitor the relationship between Hydrbrew and your recovery metrics. Gain a clearer picture of your HRV and sleep architecture patterns. No more guessing, just better visibility into your biology." },
      { time: 65, text: "Sign up below for the Beta. Help us refine the loop before our full launch in late 2026. These features are currently in development for a Q4 release. hydrbrew°: Engineered for the measured life." }
    ]
  },
  twoWaysToPlay: {
    id: 'twoWaysToPlay',
    audioUrl: 'https://stream.mux.com/my80000T2HkXy4mK3WzxmfSnE5bDJtLKeVOSORL4kqvwM.m3u8',
    characterName: 'ZEVON',
    characterTitle: 'HUMAN OPT.',
    characterImage: 'https://i.imgur.com/H43dZi2.jpeg',
    volumeBoost: 3.6, // 360% boost to match other Mux-encoded briefings
    transcript: [
      { time: 0, text: "The protocol is live, and there are two ways to play. Whether you're a digital scout or a field operative, your engagement fuels the loop." },
      { time: 12, text: "Phase One: Mission Intel. Join the waitlist to unlock the hunt. Four encrypted digits are hidden across the base—find them to claim one of only 100 limited-edition \"Phygital\" Medallions. These aren't just collectibles; they are your physical keys to the HydrCore VR worlds and exclusive orbital drops. The supply is strictly limited—you will be prompted via email to decode the sequence before the vault closes." },
      { time: 42, text: "Phase Two: The QR Scan Event. At launch, every can of hydrbrew° becomes a live node. Scan to extract cash prizes and rare character NFTs with VR utility." },
      { time: 55, text: "Beyond the rewards, each scan accelerates your optimized human state while subtracting twenty-four hours from the Global AGI Clock. Don't just wait for 2030—optimize the timeline." },
      { time: 71, text: "8 cash prizes. 16 Character NFTs. Unlimited entries. The more you scan, the higher your probability of extraction. Don't just observe the future—accelerate it." },
      { time: 85, text: "Join the hunt in Mission Intel or prepare for the Scan Event at launch. Two paths. One goal: Total optimization. hydrbrew°: The game is on." }
    ]
  },
  transmitTheSignal: {
    id: 'transmitTheSignal',
    audioUrl: 'https://stream.mux.com/7Z023OXnLLNLiDmrN1W7DtfsKvBky9If1uP1DkWQmNl8.m3u8',
    characterName: 'ZEVON',
    characterTitle: 'HUMAN OPT.',
    characterImage: 'https://i.imgur.com/H43dZi2.jpeg',
    volumeBoost: 3.6, // 360% boost to match other Mux-encoded briefings
    transcript: [
      { time: 0, text: "A single node is a curiosity. A network is a force. To achieve a truly optimized human structure, we must scale the perimeter. This isn't just about the product; it's about the collective frequency we are establishing." },
      { time: 19, text: "The archetypes on HydrCore Base—Zevon, Vespara, Luno, Zenara—aren't just characters. They are mirrors. They represent the cognitive and physical facets of our own potential. To understand them is to understand yourself." },
      { time: 39, text: "But this lore is not meant to be held in isolation. It is meant to be passed on. By onboarding others into the protocol, you unlock rewards that accelerate your own status within the base. Every referral is a signal transmitted." },
      { time: 57, text: "Help us build the architecture of the future. Share your link. Sync the network. Transmit the signal. The more nodes we activate, the faster we optimize the timeline." },
      { time: 71, text: "I am Zevon. You are a +1. The signal is yours to carry." }
    ]
  },
  theAntidote: {
    id: 'theAntidote',
    audioUrl: 'https://stream.mux.com/5W00y011x2zgPLwuHqShN9fTdBuTK1UNGfdLpJgMQDtRY.m3u8',
    characterName: 'ZEVON',
    characterTitle: 'HUMAN OPT.',
    characterImage: 'https://i.imgur.com/H43dZi2.jpeg',
    volumeBoost: 2.025, // 10% reduction from default 2.25
    transcript: [
      { time: 0, text: "Standard coffee is a loan against your future energy—a high-interest debt that eventually comes due. We engineered hydrbrew° to be the antidote. It's about lightness, not gravity. Optimization, not depletion." },
      { time: 18, text: "Observe the focus curve. By balancing our substrate, we've neutralized the cortisol spike. You'll see less than a five-beat-per-minute increase in resting heart rate. This keeps your system in parasympathetic flow—clean clarity without the anxiety cascade." },
      { time: 36, text: "The exit pathway is just as precise. Low sugar means a stable insulin curve and no afternoon collapse. Instead of draining you, our electrolyte layer restores. You aren't just working; you're recovering in real-time." },
      { time: 53, text: "We've kept the ritual of the cold brew taste but stripped away the systemic baggage. It's shelf-stable and ready for the field. This is how you arbitrage the now to secure a +1 baseline. This is how you become +1 You." },
      { time: 73, text: "The old paradigm is heavy. The new protocol is here. I am Zevon. You are the +1 optimized human." }
    ]
  },
  founderClosing: {
    id: 'founderClosing',
    audioUrl: 'https://stream.mux.com/rDuz4FrHamlfwUkdjhbKdgMujwicG8PQIe01oBJKK7FI.m3u8',
    characterName: 'LOUIS CAVERLY',
    characterTitle: 'FOUNDER',
    characterImage: 'https://i.imgur.com/KIVrOVW.jpeg',
    volumeBoost: 3.6, // 360% boost to match other Mux-encoded briefings
    transcript: [
      { time: 0, text: "This is Louis Caverly, founder of hydrbrew°. Thanks for visiting. You've breached the perimeter of the +1 Human experience. We've spent enough time in the simulation of 'standard' coffee. It's time to move into the high-fidelity reality of total optimization. The +1 You." },
      { time: 23, text: "Don't just watch the future—arbitrage it." },
      { time: 26, text: "Stay sharp. Stay optimized." },
      { time: 29, text: "The Base is always watching." }
    ]
  }
};

export function NeuralBriefing() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);
  const [showPortalLink, setShowPortalLink] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [showRipples, setShowRipples] = useState(false);
  const [activeBriefingId, setActiveBriefingId] = useState<string>('default');
  const [lockedBriefingId, setLockedBriefingId] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptLineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get current briefing config
  const currentBriefing: BriefingConfig =
    briefings[lockedBriefingId || activeBriefingId] ?? briefings.default!;

  // Listen for neural briefing trigger events from hero buttons and other sections
  useEffect(() => {
    const handleTrigger = (e: CustomEvent) => {
      console.log('🎯 Neural Briefing Trigger Event:', e.detail);
      console.log('   Current activeBriefingId:', activeBriefingId);
      console.log('   Current lockedBriefingId:', lockedBriefingId);
      console.log('   Current isButtonHovered:', isButtonHovered);
      setShowRipples(e.detail.active);
      
      // If briefing is active
      if (e.detail.active) {
        // Clear any pending reset timer
        if (resetTimerRef.current) {
          clearTimeout(resetTimerRef.current);
          resetTimerRef.current = null;
          console.log('   ✅ Cleared reset timer');
        }
        
        // Switch to specified briefing, or default if none specified
        const targetBriefing = e.detail.briefingId || 'default';
        console.log('   🎯 Target briefing:', targetBriefing);
        if (activeBriefingId !== targetBriefing) {
          console.log('   🔄 Switching from', activeBriefingId, 'to', targetBriefing);
          setActiveBriefingId(targetBriefing);
          setIsPlaying(false);
          setCurrentTime(0);
          setHasFinished(false);
        } else {
          console.log('   ⏭️ Already on', targetBriefing, '- no switch needed');
        }
      } else if (!e.detail.active && !isButtonHovered) {
        // When hover ends and button is not hovered, reset after delay
        console.log('   ⏳ Hover ended - will reset to default if button not hovered');
        if (resetTimerRef.current) {
          clearTimeout(resetTimerRef.current);
        }
        resetTimerRef.current = setTimeout(() => {
          if (!isButtonHovered) {
            console.log('   🔄 Resetting to default briefing after delay');
            setActiveBriefingId('default');
          } else {
            console.log('   ⏸️ Button is hovered - NOT resetting');
          }
        }, 800); // Shorter 800ms delay
      } else {
        console.log('   ⏸️ Hover ended but button is hovered - NOT starting reset timer');
      }
    };

    const handleOpenBriefing = (e: CustomEvent) => {
      console.log('🚀 Open Neural Briefing Event:', e.detail);
      // Set the briefing and open immediately
      const targetBriefing = e.detail.briefingId || 'default';
      setActiveBriefingId(targetBriefing);
      setLockedBriefingId(targetBriefing);
      setIsOpen(true);
    };

    window.addEventListener('neuralBriefingTrigger', handleTrigger as EventListener);
    window.addEventListener('openNeuralBriefing', handleOpenBriefing as EventListener);
    
    return () => {
      window.removeEventListener('neuralBriefingTrigger', handleTrigger as EventListener);
      window.removeEventListener('openNeuralBriefing', handleOpenBriefing as EventListener);
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, [activeBriefingId, isButtonHovered]);

  // Auto-open on first page visit
  useEffect(() => {
    const hasSeenBriefing = localStorage.getItem('hasSeenNeuralBriefing');
    if (!hasSeenBriefing) {
      // Delay the auto-open slightly for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('hasSeenNeuralBriefing', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Generate waveform bars (simulated audio visualization)
  const waveformBars = Array.from({ length: 40 }, (_, i) => {
    const baseHeight = Math.sin(i * 0.5) * 30 + 40;
    const playingModifier = isPlaying ? Math.sin((currentTime + i) * 2) * 20 : 0;
    return Math.max(10, Math.min(80, baseHeight + playingModifier));
  });

  // Initialize audio element and FORCE load when modal opens
  useEffect(() => {
    // Only initialize audio when modal is open
    if (!isOpen) {
      console.log('⏸️ Modal closed - skipping audio init');
      return;
    }

    // Get the audio URL from the current briefing
    const audioUrl = currentBriefing.audioUrl;
    
    console.log('🎵 FORCING audio load for briefing:', currentBriefing.id);
    console.log('🎵 Audio URL:', audioUrl);
    setIsAudioReady(false);
    setIsAudioLoading(true);
    
    // Disconnect and clean up previous audio nodes
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
        console.log('🔌 Disconnected and cleared previous source node');
      } catch (e) {
        console.log('⚠️ Error disconnecting source node:', e);
      }
    }
    if (gainNodeRef.current) {
      try {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
        console.log('🔌 Disconnected and cleared previous gain node');
      } catch (e) {
        console.log('⚠️ Error disconnecting gain node:', e);
      }
    }

    // If audio element already exists, clean it up completely
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.remove();
      audioRef.current = null;
      console.log('🧹 Cleaned up previous audio element');
    }

    // Create fresh audio element
    audioRef.current = new Audio();
    audioRef.current.src = audioUrl;
    audioRef.current.volume = 1.0;
    audioRef.current.preload = 'auto';
    audioRef.current.setAttribute('playsinline', 'true');
    audioRef.current.setAttribute('webkit-playsinline', 'true');
    audioRef.current.crossOrigin = 'anonymous';
    const audio = audioRef.current;
    console.log('🎵 Created new audio element for briefing:', currentBriefing.id);

    // Set up Web Audio API for volume boost
    try {
      // Create audio context if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        console.log('🎵 Created new AudioContext');
      }
      const audioContext = audioContextRef.current;

      // Resume audio context if suspended (required on some browsers)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
        console.log('▶️ Resumed suspended AudioContext');
      }

      // Create NEW source node from the NEW audio element
      console.log('🔧 Creating MediaElementSource for:', currentBriefing.id);
      const source = audioContext.createMediaElementSource(audio);
      sourceNodeRef.current = source;
      console.log('✅ Created source node');

      // Create NEW gain node for volume boost
      const gainNode = audioContext.createGain();
      const volumeBoost = currentBriefing.volumeBoost || 2.25; // Use briefing-specific boost or default to 2.25
      gainNode.gain.value = volumeBoost;
      gainNodeRef.current = gainNode;
      console.log(`✅ Created gain node with value: ${gainNode.gain.value}x for briefing: ${currentBriefing.id}`);

      // Connect: source -> gainNode -> destination
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      console.log(`🔊 ✅ Web Audio API boost ACTIVE: ${volumeBoost * 100}% volume for briefing: ${currentBriefing.id}`);
    } catch (error) {
      console.error('❌ Web Audio API boost FAILED for briefing:', currentBriefing.id);
      console.error('❌ Error details:', error);
      // Continue without boost - audio will still play at normal volume
    }

    // Set up event listeners
    const handleLoadedMetadata = () => {
      console.log('✅ Audio metadata loaded. Duration:', audio.duration, 'Briefing:', currentBriefing.id);
      setDuration(audio.duration);
    };
    
    const handleCanPlayThrough = () => {
      console.log('✅ Audio fully buffered and ready - can play through without delay. Briefing:', currentBriefing.id);
      setIsAudioReady(true);
      setIsAudioLoading(false);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setHasFinished(true);
    };
    
    const handleError = (e: Event) => {
      console.error('❌ Audio loading error:', e);
      console.error('Audio error code:', audio.error?.code);
      console.error('Audio error message:', audio.error?.message);
      console.error('Current src:', audio.src);
      console.error('Audio network state:', audio.networkState);
      console.error('Audio ready state:', audio.readyState);
      setIsAudioReady(false);
      setIsAudioLoading(false);
    };
    
    const handleCanPlay = () => {
      console.log('✅ Audio can play - ready for playback. Briefing:', currentBriefing.id);
      console.log('Audio ready state:', audio.readyState);
      // Set ready immediately - don't wait for canplaythrough
      setIsAudioReady(true);
      setIsAudioLoading(false);
    };
    
    const handleLoadStart = () => {
      console.log('⏳ Audio loading started...');
      setIsAudioLoading(true);
    };
    
    const handleProgress = () => {
      if (audio.buffered.length > 0) {
        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        const duration = audio.duration;
        if (duration > 0) {
          const percentBuffered = (bufferedEnd / duration) * 100;
          console.log(`📊 Audio buffered: ${percentBuffered.toFixed(1)}%`);
        }
      }
    };
    
    const handleSuspend = () => {
      console.log('⚠️ Audio loading suspended by browser');
    };
    
    const handleStalled = () => {
      console.log('⚠️ Audio loading stalled');
    };
    
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('progress', handleProgress);
    audio.addEventListener('suspend', handleSuspend);
    audio.addEventListener('stalled', handleStalled);
    
    // FORCE load the audio immediately
    audio.load();
    
    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('progress', handleProgress);
      audio.removeEventListener('suspend', handleSuspend);
      audio.removeEventListener('stalled', handleStalled);
      audio.pause();
    };
  }, [isOpen, activeBriefingId, currentBriefing.audioUrl, currentBriefing.id]);

  // Handle play/pause state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Add a small delay to ensure user interaction is registered on mobile
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error('Audio playback failed:', err);
          console.error('This may be due to autoplay policies on mobile devices');
          setIsPlaying(false);
          
          // On mobile, we might need to retry with user interaction
          if (err.name === 'NotAllowedError' || err.name === 'NotSupportedError') {
            console.log('Audio blocked by browser policy - user interaction required');
          }
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // For mobile compatibility, handle the audio play directly in the click handler
    if (!isPlaying) {
      // Reset if at end
      if (currentTime >= duration - 0.5) {
        audio.currentTime = 0;
        setCurrentTime(0);
      }
      
      // Initialize Web Audio Context for enhanced audio features (required for iOS)
      if (!audioContextRef.current) {
        try {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
          console.log('AudioContext initialized');
        } catch (e) {
          console.error('Failed to initialize AudioContext:', e);
        }
      }
      
      // Try to resume AudioContext if suspended (common on iOS)
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().then(() => {
          console.log('AudioContext resumed');
        });
      }
      
      // Attempt to play - this must happen directly from user interaction on mobile
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Audio playback started successfully');
          setIsPlaying(true);
        }).catch(err => {
          console.error('Failed to start audio playback:', err);
          // Alert user on mobile if autoplay is blocked
          if (err.name === 'NotAllowedError') {
            alert('Please tap the play button again to start audio playback.');
          }
        });
      } else {
        setIsPlaying(true);
      }
    } else {
      // Pause
      audio.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current transcript line
  const getCurrentTranscriptIndex = () => {
    for (let i = currentBriefing.transcript.length - 1; i >= 0; i--) {
      const line = currentBriefing.transcript[i];
      if (line != null && currentTime >= line.time) {
        return i;
      }
    }
    return 0;
  };

  const currentTranscriptIndex = getCurrentTranscriptIndex();

  // Auto-scroll transcript to current line
  useEffect(() => {
    if (isPlaying && transcriptLineRefs.current[currentTranscriptIndex]) {
      transcriptLineRefs.current[currentTranscriptIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentTranscriptIndex, isPlaying]);

  return (
    <>
      {/* Floating Button (Bottom Right) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setIsOpen(true);
              // Lock the current briefing when opening the modal
              setLockedBriefingId(activeBriefingId);
            }}
            className="fixed bottom-6 right-6 z-50 group"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <div className="relative">
              {/* Expanding ripple rings - triggered by hero button hover */}
              <AnimatePresence>
                {showRipples && (
                  <>
                    {[0, 1, 2].map((index) => (
                      <motion.div
                        key={index}
                        className="absolute inset-0 rounded-full border-2 border-cyan-400"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ 
                          scale: [1, 3.5],
                          opacity: [0.8, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: index * 0.5,
                          ease: "easeOut"
                        }}
                        style={{
                          boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)'
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
              
              {/* Pulsing glow rings */}
              <div className="absolute -inset-2 bg-cyan-500/30 rounded-full blur-xl animate-pulse" />
              <div className="absolute -inset-4 bg-transparent rounded-full" />
              
              {/* Main button */}
              <motion.div 
                className="relative w-16 h-16 bg-black border-2 border-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.9)] transition-all group-hover:scale-110"
                animate={showRipples ? {
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 30px rgba(6,182,212,0.6)',
                    '0 0 60px rgba(6,182,212,1)',
                    '0 0 30px rgba(6,182,212,0.6)'
                  ]
                } : {}}
                transition={{
                  duration: 1,
                  repeat: showRipples ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {/* Waveform icon animation */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-cyan-400 rounded-full"
                      style={{
                        height: `${12 + i * 4}px`,
                        animation: `wave-pulse 0.8s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Label */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <motion.div 
                  className={`border px-2 py-1 rounded text-[10px] font-mono transition-all ${
                    activeBriefingId === 'optimizedHuman' 
                      ? 'bg-red-950 border-red-500 text-red-400' 
                      : 'bg-black border-cyan-500/50 text-cyan-400'
                  }`}
                  animate={{
                    opacity: showRipples ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {activeBriefingId === 'optimizedHuman' ? '+1 OPTIMIZED HUMAN' : 'NEURAL BRIEFING'}
                </motion.div>
              </div>

              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 rounded-tl" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60 rounded-tr" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400/60 rounded-bl" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 rounded-br" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Player Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false);
                setIsPlaying(false);
                // Unlock briefing when closing
                setLockedBriefingId(null);
              }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Player Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-6 right-6 w-[95vw] sm:w-[450px] z-50"
            >
              <div className="relative">
                {/* Glowing border animation */}
                <div 
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-75"
                  style={{
                    animation: isPlaying ? 'glow-pulse 2s ease-in-out infinite' : 'none'
                  }}
                />

                {/* Main container */}
                <div className="relative bg-neutral-950 border-2 border-cyan-500/70 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Header */}
                  <div className="relative bg-gradient-to-r from-cyan-500/20 via-cyan-400/10 to-cyan-500/20 border-b border-cyan-500/30 px-4 py-3">
                    {/* Scanlines */}
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.3) 2px, rgba(6, 182, 212, 0.3) 4px)'
                    }} />

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Character avatar */}
                        <div className="relative w-10 h-10">
                          {/* Sunbeam rays - only for founder briefing when playing */}
                          {currentBriefing.id === 'founderClosing' && isPlaying && (
                            <>
                              {/* Rotating sunbeams */}
                              <motion.div
                                className="absolute inset-0 -z-10"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 8,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                              >
                                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                                  <div
                                    key={angle}
                                    className="absolute top-1/2 left-1/2 origin-left"
                                    style={{
                                      transform: `rotate(${angle}deg)`,
                                      width: '60px',
                                      height: '3px'
                                    }}
                                  >
                                    <div className="w-full h-full bg-gradient-to-r from-amber-400/80 via-yellow-400/60 to-transparent blur-sm" />
                                  </div>
                                ))}
                              </motion.div>
                              
                              {/* Golden glow */}
                              <motion.div
                                className="absolute inset-0 -z-10 rounded-full bg-amber-400/40 blur-xl"
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.4, 0.7, 0.4]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                            </>
                          )}
                          
                          {/* Avatar container */}
                          <motion.div 
                            className={`relative rounded-full border-2 overflow-hidden ${
                              currentBriefing.id === 'founderClosing' && isPlaying 
                                ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.6)]' 
                                : 'border-cyan-500'
                            }`}
                            animate={currentBriefing.id === 'founderClosing' && isPlaying ? {
                              scale: [1, 1.7, 1.7, 1],
                              boxShadow: [
                                '0 0 20px rgba(251,191,36,0.6)',
                                '0 0 60px rgba(251,191,36,1)',
                                '0 0 60px rgba(251,191,36,1)',
                                '0 0 20px rgba(251,191,36,0.6)'
                              ]
                            } : {}}
                            transition={{
                              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                          >
                            <motion.img
                              src={currentBriefing.characterImage}
                              alt={currentBriefing.characterName}
                              className="w-full h-full object-cover"
                              animate={currentBriefing.id === 'founderClosing' && isPlaying ? {
                                filter: [
                                  'brightness(1) contrast(1)',
                                  'brightness(1.2) contrast(1.1)',
                                  'brightness(1.2) contrast(1.1)',
                                  'brightness(1) contrast(1)'
                                ]
                              } : isPlaying ? {
                                filter: [
                                  'brightness(1) contrast(1) saturate(1)',
                                  'brightness(1.15) contrast(1.05) saturate(1.2)',
                                  'brightness(1) contrast(1) saturate(1)'
                                ],
                                scale: [1, 1.05, 1]
                              } : {}}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.div>
                        </div>
                        <div>
                          <div className="text-xs font-mono text-cyan-400 tracking-wider">NEURAL BRIEFING</div>
                          <div className="text-sm text-white font-mono">{currentBriefing.characterName} // {currentBriefing.characterTitle}</div>
                        </div>
                      </div>

                      {/* Close button */}
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          setIsPlaying(false);
                          // Unlock briefing when closing
                          setLockedBriefingId(null);
                        }}
                        className="w-8 h-8 border border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10 rounded flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-cyan-400" />
                      </button>
                    </div>
                  </div>

                  {/* Waveform Visualization */}
                  <div className="relative px-4 py-6 bg-black/50">
                    <div className="flex items-center justify-center gap-0.5 h-20">
                      {waveformBars.map((height, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-full"
                          style={{ height: `${height}%` }}
                          animate={{
                            height: isPlaying ? `${height}%` : '20%',
                            opacity: isPlaying ? (i <= (currentTime / duration) * 40 ? 1 : 0.3) : 0.3
                          }}
                          transition={{ duration: 0.1 }}
                        />
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4">
                      <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-[10px] font-mono text-cyan-400/60">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Transcript Display */}
                  <div ref={transcriptRef} className="relative px-4 py-4 bg-neutral-950/50 border-t border-cyan-500/20 max-h-32 overflow-y-auto custom-scrollbar">
                    <div className="space-y-2">
                      {currentBriefing.transcript.map((line, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0.3 }}
                          animate={{
                            opacity: index === currentTranscriptIndex ? 1 : (index < currentTranscriptIndex ? 0.4 : 0.3),
                            scale: index === currentTranscriptIndex ? 1.02 : 1,
                            x: index === currentTranscriptIndex ? 4 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className={`text-xs leading-relaxed ${
                            index === currentTranscriptIndex
                              ? 'text-cyan-300 font-medium'
                              : index < currentTranscriptIndex
                              ? 'text-neutral-500'
                              : 'text-neutral-600'
                          }`}
                          ref={(el) => {
                            transcriptLineRefs.current[index] = el;
                          }}
                        >
                          <span className="font-mono text-[10px] text-cyan-500/50 mr-2">
                            [{formatTime(line.time)}]
                          </span>
                          {line.text}
                        </motion.div>
                      ))}
                      
                      {/* Hidden Portal Link - Appears after audio finishes */}
                      <AnimatePresence>
                        {hasFinished && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 2 }}
                            className="mt-4 pt-3 border-t border-purple-500/20"
                          >
                            <div className="text-xs leading-relaxed space-y-1">
                              <div className="font-mono text-[10px] text-purple-500/70 mb-1 animate-pulse">
                                [CLASSIFIED TRANSMISSION DETECTED]
                              </div>
                              <div className="text-purple-400/80 mb-2">
                                ⚠️ SECTOR 7 COORDINATES UNLOCKED
                              </div>
                              <button
                                onClick={() => setIsPortalOpen(true)}
                                className="group flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 rounded text-xs text-purple-300 hover:text-purple-200 font-mono transition-all"
                              >
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                                </span>
                                <span>[PORTAL ACCESS GRANTED]</span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="relative px-4 py-4 bg-gradient-to-t from-neutral-950 to-black border-t border-cyan-500/30">
                    <div className="flex items-center justify-between">
                      {/* Play/Pause Button */}
                      <button
                        onClick={handlePlayPause}
                        disabled={isAudioLoading && !isAudioReady}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-[0_0_20px_rgba(6,182,212,0.6)] ${
                          isAudioLoading && !isAudioReady 
                            ? 'bg-neutral-700 cursor-not-allowed opacity-50' 
                            : 'bg-cyan-500 hover:bg-cyan-400 hover:scale-110 active:scale-95'
                        }`}
                      >
                        {isAudioLoading && !isAudioReady ? (
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : isPlaying ? (
                          <div className="flex gap-1">
                            <div className="w-1 h-4 bg-black rounded-full" />
                            <div className="w-1 h-4 bg-black rounded-full" />
                          </div>
                        ) : (
                          <div className="w-0 h-0 border-l-[8px] border-l-black border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1" />
                        )}
                      </button>

                      {/* Status indicators */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            isAudioLoading && !isAudioReady ? 'bg-yellow-500 animate-pulse' :
                            isPlaying ? 'bg-red-500 animate-pulse' : 'bg-neutral-600'
                          }`} />
                          <span className="text-[10px] font-mono text-neutral-400">
                            {isAudioLoading && !isAudioReady ? 'LOADING...' : 
                             isPlaying ? 'TRANSMITTING' : 'STANDBY'}
                          </span>
                        </div>

                        {isPlaying ? (
                          <Volume2 className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <VolumeX className="w-4 h-4 text-neutral-600" />
                        )}
                      </div>
                    </div>

                    {/* Protocol label */}
                    <div className="mt-3 pt-3 border-t border-cyan-500/20 text-center">
                      <div className="text-[10px] font-mono text-cyan-400/60 tracking-widest">
                        OPTIMIZED HUMAN PROTOCOL // TRANSMISSION ACTIVE
                      </div>
                    </div>
                  </div>

                  {/* Corner frame accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/60" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/60" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/60" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/60" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CSS for animations and scrollbar */}
      <style>{`
        @keyframes wave-pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.5);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.8);
        }
      `}</style>

      {/* VR Portal Modal */}
      <VRPortalModal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
    </>
  );
}
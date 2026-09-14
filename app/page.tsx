'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';

interface Beat {
  id: string;
  name: string;
  filename: string;
  bpm: number;
  key: string;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  spotifyUrl: string;
  image: string;
  plays: string;
  details: string;
}

interface Release {
  id: string;
  title: string;
  artist: string;
  spotifyUrl: string;
  image: string;
}

interface Genre {
  name: string;
  filename: string;
}

function parseBeatName(filename: string): Beat {
  const baseName = filename.replace(/\.mp3$/i, '');
  const parts = baseName.split('_');

  const name = parts.slice(0, -2).join('_');
  const bpm = parseInt(parts[parts.length - 2], 10);
  const key = parts[parts.length - 1];

  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name: name.toUpperCase(),
    filename,
    bpm,
    key,
  };
}

const beats: Beat[] = [
  'DRIFT KING_96_Gm.mp3',
  'LAST OF US_113_G#m.mp3',
  'PESTOM SAGAR_65_A#m.mp3',
  'SIMAR_94_Em.mp3',
  'MONEY_110_D.mp3',
  'OCTANE_130_Bm.mp3',
  'STREETS_80_Fm.mp3',
  'WHISPER_140_Bb.mp3',
  'THE FIRST LIGHT_70_Emin.mp3',
].map(parseBeatName);

const spotifyTracks: Track[] = [
  {
    id: 'honathi',
    title: 'Hona Hi Tha',
    artist: 'Yungsta × Sez On The Beat, Dilliboy ft. Raga & Encore',
    spotifyUrl:
      'https://open.spotify.com/track/3ezm3DukK26vagWIIPvmgS?si=67fc16c55340490a',
    image: '/artworks/yungsta-honathi.jpg',
    plays: '2.13M+',
    details: 'Produced alongside Sez On The Beat · Mass Appeal India',
  },
  {
    id: 'husna',
    title: 'Husna Di Rani',
    artist: 'Tricksingh & Dilliboy',
    spotifyUrl:
      'https://open.spotify.com/track/2dlX7O1I6eLTUDTJffbJhq?si=1a9f57f058db468b',
    image: '/artworks/tricksingh-husna.jpg',
    plays: '480K+',
    details: 'Produced by Dilliboy',
  },
  {
    id: 'phonecall',
    title: 'Phonecall Freestyle',
    artist: 'Tricksingh',
    spotifyUrl:
      'https://open.spotify.com/track/2KjfvP9zuQ6XWrZWGw6U8Z?si=f84beebe227f42af',
    image: '/artworks/tricksingh-phonecall.jpg',
    plays: '350K+',
    details: 'Produced by Eyepatch & Dilliboy · Big Bang Records',
  },
  {
    id: 'noteazy',
    title: 'Not Eazy',
    artist: 'Rebel 7',
    spotifyUrl:
      'https://open.spotify.com/track/7eKSMr30663RxP3e9oLRa9?si=9248a98ec662482a',
    image: '/artworks/rebel7-noteazy.jpg',
    plays: '30K+',
    details: 'Produced by Dilliboy · Azadi Records',
  },
];

const latestReleases: Release[] = [
  {
    id: 'no-tempo',
    title: 'No Tempo',
    artist: 'Viksit, 7 Khoon Maaf · Dilliboy & Purab Paschim',
    spotifyUrl:
      'https://open.spotify.com/album/3u6lyoXYUfej9cHXVTRksj?si=Mi2WiXelTNIk4hbbBVZrg',
    image: '/artworks/No Tempo.jpg',
  },
  {
    id: 'timelapse',
    title: 'Timelapse',
    artist: 'Dilliboy & Split Music',
    spotifyUrl:
      'https://open.spotify.com/album/7EyPjhqLFGcIZ6AGw0qucQ?si=IB72kgEZTneMkKYiuFy-SA',
    image: '/artworks/Timelapse.jpg',
  },
  {
    id: 'samarpan',
    title: 'Samarpan',
    artist: 'Dilliboy & Sikka',
    spotifyUrl:
      'https://open.spotify.com/album/3WpNTfypyNUeRZdtGuXUGA?si=OEDsIPnxSZuLzmKguJCZgg',
    image: '/artworks/Samarpan.jpg',
  },
  {
    id: 'pratighaat',
    title: 'Pratighaat',
    artist: 'Dilliboy & Purab Paschim',
    spotifyUrl:
      'https://open.spotify.com/album/5mPT66W691CFVWnkUWeftR?si=ILmMuyVERAG9BIxKEQaPYQ',
    image: '/artworks/Pratighaat.jpg',
  },
];

const genreNames: string[] = [
  'Afrobeat',
  'Boom Bap',
  'Bounce',
  'Dancehall',
  'Detroit',
  'Disco',
  'Drum & Bass',
  'Dubstep',
  'Experimental',
  'Funk',
  'Future Beats',
  'Game',
  'House',
  'Indian Bounce',
  'Indie',
  'Lofi',
  'Opium',
  'Orchestral',
  'Pop',
  'RnB',
  'Soul',
  'Synthwave',
  'Trap',
  'UK Bass',
];

const genres: Genre[] = genreNames.map((name) => ({
  name,
  filename: `${name}.mp3`,
}));

const galleryImages = [
  '/gallery/Dilliboy gallery image 1.png',
  '/gallery/Dilliboy gallery image 2.jpg',
  '/gallery/Dilliboy gallery image 3.jpg',
  '/gallery/Dilliboy gallery image 4.jpg',
  '/gallery/Dilliboy gallery image 5.jpg',
  '/gallery/Dilliboy gallery image 6.jpg',
  '/gallery/Dilliboy gallery image 7.png',
  '/gallery/Dilliboy gallery image 8.png',
  '/gallery/Dilliboy gallery image 9.jpg',
  '/gallery/Dilliboy gallery image 10.jpg',
  '/gallery/Dilliboy gallery image 11.jpg',
];

/* ============================================================= */
/* SHARED SMOOTH EASING — used everywhere motion needs to feel   */
/* like part of the same system instead of ad-hoc easing.        */
/* ============================================================= */
const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ============================================================= */
/* SMOOTH SCROLL — a single, self-cancelling, eased scroll        */
/* driver used by the nav and every "jump to section" button so   */
/* every one of them feels identical and never fights the         */
/* browser's own (inconsistent, per-browser) native smooth        */
/* scrolling implementation.                                      */
/* ============================================================= */
let scrollAnimationToken = 0;

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function smoothScrollToId(id: string, offset = 84, duration = 900) {
  const element = document.getElementById(id);
  if (!element) return;

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const getTargetY = () =>
    element.getBoundingClientRect().top + window.scrollY - offset;

  if (prefersReduced) {
    window.scrollTo({ top: getTargetY() });
    return;
  }

  const token = ++scrollAnimationToken;
  const startY = window.scrollY;
  const targetY = getTargetY();
  const distance = targetY - startY;
  const startTime = performance.now();

  // If the person grabs the page mid-flight (wheel/touch/keyboard), the
  // animation backs off immediately instead of fighting their input —
  // that fight is exactly what reads as "stiff" or "janky".
  const cancel = () => {
    scrollAnimationToken += 1;
  };
  window.addEventListener('wheel', cancel, { passive: true, once: true });
  window.addEventListener('touchstart', cancel, { passive: true, once: true });

  const step = (now: number) => {
    if (token !== scrollAnimationToken) return;

    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    const eased = easeOutExpo(t);
    window.scrollTo(0, startY + distance * eased);

    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
    }
  };

  requestAnimationFrame(step);
}

/* ============================================================= */
/* GLOBAL STYLES — cursor safe-zones, hover-scale smoothing,     */
/* flowing gradients, scrollbar treatment for the beat player.   */
/* ============================================================= */
function GlobalStyles() {
  return (
    <style jsx global>{`
      html {
        /*
          The nav / hero buttons drive scrolling manually via
          smoothScrollToId's own rAF + easing loop. If the browser's
          native CSS smooth-scroll is ALSO turned on, every
          window.scrollTo() call inside that loop kicks off its own
          native smooth animation on top of the manual one, and the
          two fight each other every frame — that's what reads as a
          stutter/jank instead of one clean glide. Keeping this at
          "auto" hands scrolling fully to the manual driver.
        */
        scroll-behavior: auto;
      }

      * {
        -webkit-tap-highlight-color: transparent;
      }

      @media (pointer: fine) {
        .custom-cursor-active,
        .custom-cursor-active * {
          cursor: none !important;
        }
        .custom-cursor-active .cursor-native-zone,
        .custom-cursor-active .cursor-native-zone * {
          cursor: auto !important;
        }
      }

      .hover-scale-smooth {
        transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
        will-change: transform;
        transform: translateZ(0) scale(1);
        backface-visibility: hidden;
      }
      .group:hover .hover-scale-smooth {
        transform: translateZ(0) scale(1.06);
      }
      .hover-scale-smooth-lg {
        transition: transform 1100ms cubic-bezier(0.16, 1, 0.3, 1);
        will-change: transform;
        transform: translateZ(0) scale(1);
        backface-visibility: hidden;
      }
      .group:hover .hover-scale-smooth-lg {
        transform: translateZ(0) scale(1.1);
      }

      @keyframes gradient-flow {
        0% {
          background-position: 0% 30%;
        }
        50% {
          background-position: 100% 70%;
        }
        100% {
          background-position: 0% 30%;
        }
      }
      .flow-gradient {
        background-size: 220% 220%;
        animation: gradient-flow 10s ease-in-out infinite;
      }

      @keyframes bubble-sheen {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .bubble-sheen {
        animation: bubble-sheen 7s linear infinite;
      }
      .bubble-pop {
        transition: transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .group\/bubble:hover .bubble-pop {
        transform: scale(1.08);
      }
      .group\/bubble:active .bubble-pop {
        transform: scale(0.93);
      }

      .no-scrollbar {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }

      /*
        The nav is fixed at the top (h-16 = 64px). Section scroll offset
        is now handled entirely by smoothScrollToId's own offset math,
        so this just keeps native/anchor-driven jumps (e.g. browser
        back/forward restoring a #hash) landing in the same spot.
      */
      #home,
      #about,
      #music,
      #work,
      #live,
      #genres,
      #services,
      #gallery,
      #contact {
        scroll-margin-top: 84px;
      }

      @keyframes fountain-up {
        from {
          transform: translate3d(0, 0, 0);
        }
        to {
          transform: translate3d(0, -50%, 0);
        }
      }
      @keyframes fountain-down {
        from {
          transform: translate3d(0, -50%, 0);
        }
        to {
          transform: translate3d(0, 0, 0);
        }
      }

      /*
        Mobile perf: large blurred glow/gradient layers are cheap on
        desktop GPUs but expensive to repaint on mid-range phones,
        especially while scrolling. Trim blur radius and disable the
        constantly-animating flowing gradient below the sm breakpoint.
      */
      @media (max-width: 640px) {
        .flow-gradient {
          animation: none;
          background-position: 30% 40%;
        }
      }
    `}</style>
  );
}

function AssetImage({
  src,
  alt,
  className = '',
  eager = false,
  onLoad,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}) {
  const [source, setSource] = useState(src);

  // Without this, swapping `src` on an already-mounted AssetImage (e.g.
  // clicking "next" in the gallery lightbox, which reuses the same
  // component instance) left `source` stuck at whatever it was on first
  // mount, so the <img> never updated even though the prop changed.
  useEffect(() => {
    setSource(src);
  }, [src]);

  const fallbackSources = [
    src,
    src.replace(/\.jpg$/i, '.jpeg'),
    src.replace(/\.jpg$/i, '.png'),
    src.replace(/\.jpg$/i, '.webp'),
  ];

  const handleError = () => {
    const currentIndex = fallbackSources.indexOf(source);
    const next = fallbackSources[currentIndex + 1];

    if (next) {
      setSource(next);
    }
  };

  return (
    <img
      src={source}
      alt={alt}
      onError={handleError}
      onLoad={onLoad}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

/* ============================================================= */
/* BEAT PLAYER — consolidated state via a small hook, side-by-   */
/* side scrollable cards, reactive hover, flowing ASMR gradient  */
/* on the active card.                                           */
/* ============================================================= */

interface BeatPlayerState {
  currentBeatId: string | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
}

function useBeatPlayer(beatList: Beat[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<BeatPlayerState>({
    currentBeatId: null,
    isPlaying: false,
    progress: 0,
    duration: 0,
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setState((s) => ({ ...s, isPlaying: true }));
    const onPause = () => setState((s) => ({ ...s, isPlaying: false }));
    const onTimeUpdate = () =>
      setState((s) => ({ ...s, progress: audio.currentTime }));
    const onMeta = () =>
      setState((s) => ({ ...s, duration: audio.duration || 0 }));
    const onEnded = () =>
      setState((s) => ({ ...s, isPlaying: false, progress: 0 }));

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('durationchange', onMeta);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('durationchange', onMeta);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const select = useCallback(
    async (beatId: string) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (state.currentBeatId === beatId) {
        if (state.isPlaying) {
          audio.pause();
        } else {
          try {
            await audio.play();
          } catch (error) {
            console.error('Playback failed:', error);
          }
        }
        return;
      }

      const beat = beatList.find((item) => item.id === beatId);
      if (!beat) return;

      audio.pause();
      setState({
        currentBeatId: beatId,
        isPlaying: false,
        progress: 0,
        duration: 0,
      });

      audio.src = `/beats/${encodeURIComponent(beat.filename)}`;
      audio.load();

      try {
        await audio.play();
      } catch (error) {
        console.error('Playback failed:', error);
        setState((s) => ({ ...s, isPlaying: false }));
      }
    },
    [beatList, state.currentBeatId, state.isPlaying]
  );

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(time)) return;
    audio.currentTime = time;
    setState((s) => ({ ...s, progress: time }));
  }, []);

  return { audioRef, state, select, seek };
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const beatGradients = [
  'linear-gradient(135deg, #20252d 0%, #34445c 52%, #151b27 100%)',
  'linear-gradient(135deg, #24205c 0%, #453bc4 52%, #16143b 100%)',
  'linear-gradient(135deg, #173f49 0%, #14778a 52%, #10252d 100%)',
  'linear-gradient(135deg, #4b1d48 0%, #812b76 52%, #211426 100%)',
  'linear-gradient(135deg, #593512 0%, #a95d0b 52%, #24160b 100%)',
];

const beatGlowColors = ['#64748b', '#6366f1', '#06b6d4', '#d946ef', '#f59e0b'];

function BeatPlayer() {
  const { audioRef, state, select, seek } = useBeatPlayer(beats);
  const { currentBeatId, isPlaying, progress, duration } = state;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollBarRef = useRef<HTMLDivElement | null>(null);
  const wheelTargetRef = useRef<number | null>(null);
  const wheelRafRef = useRef<number | null>(null);

  // Single eased-approach loop that owns scrollLeft for this row —
  // used by BOTH wheel/trackpad input and by "center the newly
  // selected beat" below. Routing both through the same loop (instead
  // of wheel using this and selection using the browser's own
  // scrollIntoView) means there's only ever one thing driving
  // scrollLeft at a time, so they never fight each other.
  const runRowScrollLoop = useCallback(() => {
    const animate = () => {
      const node = scrollRef.current;
      const target = wheelTargetRef.current;
      if (!node || target === null) {
        wheelRafRef.current = null;
        return;
      }
      const diff = target - node.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        node.scrollLeft = target;
        wheelRafRef.current = null;
        wheelTargetRef.current = null;
        return;
      }
      node.scrollLeft += diff * 0.16;
      wheelRafRef.current = requestAnimationFrame(animate);
    };

    if (wheelRafRef.current === null) {
      wheelRafRef.current = requestAnimationFrame(animate);
    }
  }, []);

  // Wheel/trackpad input scrolls the row horizontally with its own
  // eased approach to the target instead of native jump-per-tick
  // scrolling, so the row glides instead of stepping.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      // Only hijack gestures that read as vertical intent (mouse wheel,
      // or a trackpad scroll steeper than it is sideways) — genuine
      // horizontal trackpad swipes pass through untouched.
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;

      event.preventDefault();
      const current = wheelTargetRef.current ?? el.scrollLeft;
      wheelTargetRef.current = Math.min(max, Math.max(0, current + event.deltaY));
      runRowScrollLoop();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (wheelRafRef.current) cancelAnimationFrame(wheelRafRef.current);
    };
  }, [runRowScrollLoop]);

  // Direct DOM write on scroll (not React state) so the indicator can
  // track every scroll tick without re-rendering the whole row.
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    const bar = scrollBarRef.current;
    if (!el || !bar) return;
    const scrollable = el.scrollWidth - el.clientWidth;
    const pct = scrollable > 0 ? (el.scrollLeft / scrollable) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(6, pct))}%`;
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [handleScroll]);

  // Centers the newly-active card. This used to call the browser's own
  // scrollIntoView({behavior:'smooth'}) — a SECOND, independently-timed
  // animation running at the same moment the card's width is also
  // animating (see the card's `animate={{ width }}` below), plus three
  // stacked setTimeouts forcing layout reads (getBoundingClientRect)
  // while both of those were still moving. That combination — two
  // uncoordinated animations plus repeated forced layout — is what
  // read as jerky/laggy. Now the target position is computed directly
  // from the same width formula the cards animate to (so it doesn't
  // need to read the DOM mid-transition) and is driven by the exact
  // same eased loop the wheel uses, so there's only one thing moving
  // scrollLeft, once, on one timeline.
  useEffect(() => {
    if (!currentBeatId) return;
    const container = scrollRef.current;
    if (!container) return;
    const index = beats.findIndex((b) => b.id === currentBeatId);
    if (index === -1) return;

    const raf = requestAnimationFrame(() => {
      const vw = window.innerWidth;
      const gap = 12; // matches the row's gap-3
      const activeWidth = Math.min(vw * 0.78, 560);
      const inactiveWidth = Math.min(vw * 0.42, 190);

      let offset = 0;
      for (let i = 0; i < index; i += 1) {
        offset += inactiveWidth + gap;
      }

      const target = offset + activeWidth / 2 - container.clientWidth / 2;
      const max = container.scrollWidth - container.clientWidth;
      wheelTargetRef.current = Math.min(Math.max(target, 0), Math.max(max, 0));
      runRowScrollLoop();
    });

    return () => cancelAnimationFrame(raf);
  }, [currentBeatId, runRowScrollLoop]);

  const handleProgressClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!duration || !Number.isFinite(duration)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const clickPosition = (event.clientX - rect.left) / rect.width;
    const clamped = Math.min(1, Math.max(0, clickPosition));
    seek(clamped * duration);
  };

  return (
    <section className="w-full min-w-0 overflow-visible">
      <audio ref={audioRef} preload="metadata" />

      <div className="mb-10 flex min-w-0 items-end justify-between gap-6">
        <div className="min-w-0">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-zinc-500">
            Original Beats
          </p>
        </div>

        <div className="hidden shrink-0 text-xs uppercase tracking-[0.25em] text-zinc-600 md:block">
          Select a beat
        </div>
      </div>

      {/*
        Side-by-side scrollable row. Every beat renders inline; the
        active one expands in place while the row stays scrollable
        so nothing gets clipped out of view on any screen size.
      */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="no-scrollbar flex h-[312px] w-full min-w-0 gap-3 overflow-x-auto px-4 pb-2 pt-3 md:h-[332px] md:px-6"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 4%, black 13%, black 87%, rgba(0,0,0,0.35) 96%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 4%, black 13%, black 87%, rgba(0,0,0,0.35) 96%, transparent 100%)',
        }}
      >
        {beats.map((beat, index) => {
          const isActive = currentBeatId === beat.id;

          return (
            <motion.div
              key={beat.id}
              ref={(el) => {
                cardRefs.current[beat.id] = el;
              }}
              className="relative h-full shrink-0 snap-start overflow-hidden rounded-[24px]"
              animate={{
                width: isActive ? 'min(78vw, 560px)' : 'min(42vw, 190px)',
              }}
              whileHover={
                isActive
                  ? undefined
                  : { y: -5, scale: 1.02 }
              }
              transition={{
                // A plain tween instead of a spring: springs keep
                // simulating (and re-triggering layout on every
                // sibling card as the row reflows) until they settle,
                // which is where a lot of the perceived "laggy" came
                // from. A fixed-duration tween finishes predictably
                // and lines up with the scroll-centering animation
                // above, which uses the same duration.
                width: { duration: 0.45, ease: SMOOTH_EASE },
                y: { duration: 0.35, ease: SMOOTH_EASE },
                scale: { duration: 0.35, ease: SMOOTH_EASE },
              }}
              style={{
                backgroundImage: beatGradients[index % beatGradients.length],
              }}
            >
              {/* Base atmosphere */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                animate={{ opacity: isActive ? 0.08 : 0.22 }}
                transition={{ duration: 0.7, ease: SMOOTH_EASE }}
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.78) 100%)',
                }}
              />

              <motion.div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
                style={{ background: beatGlowColors[index % beatGlowColors.length] }}
                animate={{
                  scale: isActive ? 1.35 : 0.9,
                  opacity: isActive ? 0.5 : 0.22,
                }}
                transition={{ duration: 0.9, ease: SMOOTH_EASE }}
              />

              {/* Flowing gradient — always drifting gently, blooms brighter
                  and faster once this card is active/playing */}
              <motion.div
                className="flow-gradient pointer-events-none absolute inset-0"
                animate={{ opacity: isActive ? 1 : 0.32 }}
                transition={{ duration: 0.7, ease: SMOOTH_EASE }}
                style={{
                  backgroundImage: `linear-gradient(120deg, transparent 0%, ${
                    beatGlowColors[index % beatGlowColors.length]
                  }33 35%, transparent 60%, ${
                    beatGlowColors[index % beatGlowColors.length]
                  }22 85%, transparent 100%)`,
                  animationDuration: isActive && isPlaying ? '6s' : '14s',
                }}
              />

              <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/[0.07] via-transparent to-black/20" />

              <motion.div
                className="pointer-events-none absolute inset-0 z-50 rounded-[24px] border"
                animate={{
                  borderColor: isActive
                    ? 'rgba(255,255,255,0.2)'
                    : 'rgba(255,255,255,0.07)',
                }}
                transition={{ duration: 0.5 }}
              />

              {!isActive && (
                <>
                  <button
                    type="button"
                    onClick={() => select(beat.id)}
                    aria-label={`Play ${beat.name}`}
                    className="absolute inset-0 z-30 h-full w-full cursor-pointer"
                  />

                  <div className="absolute inset-0 flex min-w-0 flex-col justify-end overflow-hidden p-4 md:p-5">
                    <div className="mb-3 flex min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap text-[8px] uppercase tracking-[0.12em] text-white/60 md:text-[9px]">
                      <span className="shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px w-3 shrink-0 bg-white/25" />
                      <span className="shrink-0">{beat.bpm} BPM</span>
                      <span className="shrink-0">{beat.key}</span>
                    </div>

                    <div className="w-full min-w-0 overflow-hidden">
                      <h3 className="w-full whitespace-normal break-words text-[12px] font-medium leading-tight tracking-[-0.025em] text-white line-clamp-2 md:whitespace-nowrap md:text-[15px] md:leading-normal md:line-clamp-1">
                        {beat.name}
                      </h3>
                    </div>
                  </div>
                </>
              )}

              <motion.div
                className="absolute inset-0 z-20 overflow-hidden"
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.42, ease: SMOOTH_EASE }}
                style={{ pointerEvents: isActive ? 'auto' : 'none' }}
              >
                <motion.div
                  className="absolute left-6 right-6 top-6 flex min-w-0 items-center justify-between gap-5 overflow-hidden"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -10 }}
                  transition={{ duration: 0.45, delay: 0.08, ease: SMOOTH_EASE }}
                >
                  <div className="flex min-w-0 items-center gap-3 overflow-hidden whitespace-nowrap">
                    <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.28em] text-white/80">
                      Original Beat
                    </span>
                    <span className="h-1 w-1 shrink-0 rounded-full bg-white/35" />
                    <span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-white/60">
                      {beat.bpm} BPM · {beat.key}
                    </span>
                  </div>

                  <div className="flex h-8 shrink-0 items-center gap-[3px]">
                    {[3, 5, 8, 12, 18, 24, 15, 20, 28, 18, 11, 7, 14, 22, 17, 9, 5].map(
                      (height, i) => (
                        <motion.span
                          key={i}
                          className="block w-[2px] rounded-full bg-white/80"
                          animate={{
                            height: isPlaying
                              ? [
                                  `${Math.max(3, height * 0.35)}px`,
                                  `${height}px`,
                                  `${Math.max(3, height * 0.5)}px`,
                                ]
                              : `${Math.max(3, height * 0.35)}px`,
                          }}
                          transition={{
                            duration: 0.7 + i * 0.025,
                            repeat: isPlaying ? Infinity : 0,
                            repeatType: 'mirror',
                            ease: 'easeInOut',
                          }}
                        />
                      )
                    )}
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-[92px] left-6 right-6 min-w-0 overflow-hidden"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 22 }}
                  transition={{
                    duration: 0.52,
                    delay: isActive ? 0.1 : 0,
                    ease: SMOOTH_EASE,
                  }}
                >
                  <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-medium tracking-[-0.025em] text-white sm:text-3xl md:text-5xl">
                    {beat.name}
                  </h3>
                  <motion.p
                    className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50"
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 5 }}
                    transition={{ duration: 0.35, delay: 0.2, ease: SMOOTH_EASE }}
                  >
                    DILLIBOY
                  </motion.p>
                </motion.div>

                <motion.button
                  type="button"
                  onClick={() => select(beat.id)}
                  aria-label={isPlaying ? `Pause ${beat.name}` : `Play ${beat.name}`}
                  className="absolute bottom-6 left-6 z-40 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-black/20"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.25, ease: SMOOTH_EASE }}
                >
                  {isPlaying ? (
                    <div className="flex items-center gap-[3px]">
                      <span className="h-4 w-[2px] rounded-full bg-black" />
                      <span className="h-4 w-[2px] rounded-full bg-black" />
                    </div>
                  ) : (
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current">
                      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l10-6.86a1 1 0 0 0 0-1.72l-10-6.86A1 1 0 0 0 8 5.14Z" />
                    </svg>
                  )}
                </motion.button>

                <div className="absolute bottom-7 left-[92px] right-6 min-w-0 overflow-visible">
                  <div className="mb-2 flex min-w-0 justify-between gap-4 text-[9px] uppercase tracking-[0.15em] text-white/45">
                    <span className="shrink-0">{formatTime(progress)}</span>
                    <span className="shrink-0">{formatTime(duration)}</span>
                  </div>

                  <div
                    onClick={handleProgressClick}
                    role="slider"
                    aria-label={`Seek ${beat.name}`}
                    aria-valuemin={0}
                    aria-valuemax={duration || 0}
                    aria-valuenow={progress}
                    tabIndex={duration > 0 ? 0 : -1}
                    className="group/seek relative h-[8px] w-full cursor-pointer rounded-full py-[3px]"
                  >
                    <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/15 transition-all duration-200 group-hover/seek:h-[4px]">
                      <motion.div
                        className="absolute left-0 top-0 h-full bg-white"
                        animate={{
                          width:
                            duration > 0
                              ? `${Math.min(100, Math.max(0, (progress / duration) * 100))}%`
                              : '0%',
                        }}
                        transition={{ duration: 0.1, ease: 'linear' }}
                      />
                    </div>

                    <motion.div
                      className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/seek:opacity-100"
                      animate={{
                        left:
                          duration > 0
                            ? `${Math.min(100, Math.max(0, (progress / duration) * 100))}%`
                            : '0%',
                      }}
                      style={{ translateX: '-50%' }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Scroll-position indicator for the horizontal row above */}
      <div className="relative mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
        <div
          ref={scrollBarRef}
          className="absolute left-0 top-0 h-full rounded-full bg-white/60 transition-[width] duration-200 ease-out"
          style={{ width: '6%' }}
        />
      </div>
    </section>
  );
}

function FeaturedTracks() {
  return (
    <div className="space-y-4">
      {spotifyTracks.map((track, index) => (
        <a
          key={track.id}
          href={track.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-5 border-b border-white/10 py-5 transition-colors duration-300 hover:border-white/30"
        >
          <span className="w-7 shrink-0 text-xs text-zinc-600">
            0{index + 1}
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold transition-colors duration-300 group-hover:text-yellow-400 md:text-xl">
              {track.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">{track.artist}</p>
            <p className="mt-2 text-xs text-zinc-600">{track.details}</p>
            <p className="mt-3 text-xs font-semibold text-yellow-400">
              {track.plays} Spotify plays
            </p>
          </div>

          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-white/10 bg-zinc-900 md:h-24 md:w-24">
            <AssetImage
              src={track.image}
              alt={track.title}
              className="hover-scale-smooth h-full w-full object-cover"
            />
          </div>

          <span className="hidden text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors group-hover:text-white sm:block">
            Spotify ↗
          </span>
        </a>
      ))}
    </div>
  );
}

function LatestReleases() {
  return (
    <div className="space-y-4">
      {latestReleases.map((release, index) => (
        <a
          key={release.id}
          href={release.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-5 border-b border-white/10 py-5 transition-colors duration-300 hover:border-white/30"
        >
          <span className="w-7 shrink-0 text-xs text-zinc-600">
            0{index + 1}
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold transition-colors duration-300 group-hover:text-yellow-400 md:text-xl">
              {release.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">{release.artist}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-600">
              Listen on Spotify ↗
            </p>
          </div>

          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-white/10 bg-zinc-900 md:h-24 md:w-24">
            <AssetImage
              src={release.image}
              alt={release.title}
              className="hover-scale-smooth h-full w-full object-cover"
            />
          </div>
        </a>
      ))}
    </div>
  );
}

function ExperienceCard({
  logo,
  logoAlt,
  title,
  role,
  period,
  description,
  accent,
  href,
}: {
  logo: string;
  logoAlt: string;
  title: string;
  role: string;
  period: string;
  description: string;
  accent: string;
  href?: string;
}) {
  const content = (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950 p-6 md:p-8">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="relative z-10">
        <div className="mb-12 flex items-start justify-between gap-6">
          <div className="flex h-14 max-w-[180px] items-center rounded-xl bg-white px-4 py-3">
            <AssetImage
              src={logo}
              alt={logoAlt}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <span className="text-right text-xs uppercase tracking-[0.18em] text-zinc-500">
            {period}
          </span>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
          {role}
        </p>

        <h3 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
          {title}
        </h3>

        <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400">
          {description}
        </p>

        {href && (
          <div className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
            View Work <span>↗</span>
          </div>
        )}
      </div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
}

function PerformanceCard({
  title,
  year,
  location,
  description,
  image,
  video,
}: {
  title: string;
  year: string;
  location: string;
  description: string;
  image: string;
  video: string;
}) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950">
      <div className="relative min-h-[420px] overflow-hidden">
        <AssetImage
          src={image}
          alt={title}
          className="hover-scale-smooth-lg absolute inset-0 h-full w-full object-cover opacity-75"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

        <div className="relative z-10 flex min-h-[420px] flex-col justify-between p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full border border-white/20 bg-black/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              {year}
            </span>
            <span className="text-right text-[10px] uppercase tracking-[0.2em] text-white/60">
              {location}
            </span>
          </div>

          <div>
            <h3 className="text-4xl font-black uppercase tracking-[-0.04em] md:text-5xl">
              {title}
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Live performance video
          </p>
          <span className="text-[10px] text-zinc-600">YouTube</span>
        </div>

        {/*
          cursor-native-zone: the custom cursor can't receive move
          events once the pointer is inside the iframe's own document,
          which is what made it look "stuck" at the edge. We restore
          the native cursor for this region and hide the custom one
          on enter/leave instead of letting it freeze.
        */}
        <div className="cursor-native-zone aspect-video overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
          <iframe
            className="h-full w-full"
            src={video}
            title={`${title} performance`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}

/* ============================================================= */
/* GENRE SHOWCASE — draggable, physics-driven bubbles that       */
/* bounce off the walls and each other. Positions are driven by  */
/* refs + rAF (not React state) so the motion stays smooth, and  */
/* are recomputed from the container's real size, which is what  */
/* keeps things comfortably spaced on small screens.             */
/* ============================================================= */

interface BubblePhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
}

const bubbleGradients = [
  'radial-gradient(circle at 30% 28%, #ffffff 0%, #f2f1ff 38%, #dcd9ff 100%)',
  'radial-gradient(circle at 30% 28%, #ffffff 0%, #eafcff 38%, #cdf3ff 100%)',
  'radial-gradient(circle at 30% 28%, #ffffff 0%, #fff0fb 38%, #ffd9f2 100%)',
  'radial-gradient(circle at 30% 28%, #ffffff 0%, #fff8e8 38%, #ffe6b3 100%)',
  'radial-gradient(circle at 30% 28%, #ffffff 0%, #f1fff4 38%, #d4ffe0 100%)',
];

function GenreShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bubbleRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const physicsRef = useRef<BubblePhysics[]>([]);
  const draggingRef = useRef<{
    index: number;
    offsetX: number;
    offsetY: number;
    lastX: number;
    lastY: number;
    lastT: number;
    vx: number;
    vy: number;
    moved: boolean;
    startX: number;
    startY: number;
    startT: number;
  } | null>(null);
  const rafRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // This physics simulation used to run every frame for the entire
  // page's lifetime (it mounts once and never unmounts), burning CPU
  // even while scrolled far away or with the tab backgrounded — a
  // steady background cost that showed up as jank/lag elsewhere on
  // the page (scrolling, other animations). Tracking visibility lets
  // the loop go idle instead of computing collisions off-screen.
  const isVisibleRef = useRef(true);

  const initPhysics = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    const isCompact = width < 640;

    // Size bubbles off the actual container area and how many genres
    // need to fit, instead of a fixed ratio of width — that's what was
    // making them balloon on taller/desktop containers regardless of
    // how many genres were packed in.
    const packingFactor = 0.5;
    const idealArea = (width * height * packingFactor) / genres.length;
    const idealRadius = Math.sqrt(idealArea / Math.PI);
    const baseRadius = isCompact
      ? Math.max(24, Math.min(38, idealRadius))
      : Math.max(32, Math.min(54, idealRadius));

    // Built with a plain loop (not .map) because each new bubble's
    // placement needs to check against the ones already placed —
    // referencing the array from inside its own .map() callback
    // throws, since it isn't assigned until the whole call returns.
    const next: BubblePhysics[] = [];

    genres.forEach((genre) => {
      const r = baseRadius + ((genre.name.length > 10 ? 4 : 0) - (isCompact ? 2 : 0));
      let x = 0;
      let y = 0;
      let attempts = 0;
      do {
        x = r + Math.random() * (width - r * 2);
        y = r + Math.random() * (height - r * 2);
        attempts += 1;
      } while (
        attempts < 20 &&
        next.some((p) => {
          const dx = p.x - x;
          const dy = p.y - y;
          return Math.sqrt(dx * dx + dy * dy) < p.r + r + 6;
        })
      );

      const angle = Math.random() * Math.PI * 2;
      const speed = isCompact ? 0.12 : 0.18;

      next.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r,
        phase: Math.random() * Math.PI * 2,
      });
    });

    physicsRef.current = next;
    setReady(true);
  }, []);

  useEffect(() => {
    initPhysics();

    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initPhysics, 200);
    });
    observer.observe(container);

    return () => {
      clearTimeout(resizeTimeout);
      observer.disconnect();
    };
  }, [initPhysics]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) isVisibleRef.current = false;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(2.2, (now - last) / (1000 / 60));
      last = now;

      const container = containerRef.current;
      const bubbles = physicsRef.current;

      if (container && bubbles.length && isVisibleRef.current && !document.hidden) {
        const { width, height } = container.getBoundingClientRect();
        const dragging = draggingRef.current;

        bubbles.forEach((b, i) => {
          if (dragging && dragging.index === i) return;

          // gentle friction so a throw settles smoothly instead of
          // staying at full energy and bouncing off walls forever —
          // ambient drift below keeps it from ever going fully still
          b.vx *= 0.985;
          b.vy *= 0.985;

          // gentle ambient drift so the field always feels alive
          b.phase += 0.006 * dt;
          const ambientX = Math.cos(b.phase) * 0.006;
          const ambientY = Math.sin(b.phase * 1.3) * 0.006;
          b.vx += ambientX * dt;
          b.vy += ambientY * dt;

          const speed = Math.hypot(b.vx, b.vy);
          const maxSpeed = 4.4;
          if (speed > maxSpeed) {
            b.vx = (b.vx / speed) * maxSpeed;
            b.vy = (b.vy / speed) * maxSpeed;
          }

          b.x += b.vx * dt;
          b.y += b.vy * dt;

          if (b.x - b.r < 0) {
            b.x = b.r;
            b.vx = Math.abs(b.vx) * 0.96;
          } else if (b.x + b.r > width) {
            b.x = width - b.r;
            b.vx = -Math.abs(b.vx) * 0.96;
          }

          if (b.y - b.r < 0) {
            b.y = b.r;
            b.vy = Math.abs(b.vy) * 0.96;
          } else if (b.y + b.r > height) {
            b.y = height - b.r;
            b.vy = -Math.abs(b.vy) * 0.96;
          }
        });

        // pairwise collisions — cheap enough for ~24 bubbles per frame
        for (let i = 0; i < bubbles.length; i += 1) {
          for (let j = i + 1; j < bubbles.length; j += 1) {
            const a = bubbles[i];
            const c = bubbles[j];
            const dx = c.x - a.x;
            const dy = c.y - a.y;
            const dist = Math.hypot(dx, dy) || 0.001;
            const minDist = a.r + c.r;

            if (dist < minDist) {
              const overlap = (minDist - dist) / 2;
              const nx = dx / dist;
              const ny = dy / dist;

              const aDragging = draggingRef.current?.index === i;
              const cDragging = draggingRef.current?.index === j;

              if (!aDragging) {
                a.x -= nx * overlap;
                a.y -= ny * overlap;
              }
              if (!cDragging) {
                c.x += nx * overlap;
                c.y += ny * overlap;
              }

              const relVx = c.vx - a.vx;
              const relVy = c.vy - a.vy;
              const relDot = relVx * nx + relVy * ny;

              if (relDot < 0) {
                const restitution = 0.94;
                const impulse = -(1 + restitution) * relDot * 0.5;
                if (!aDragging) {
                  a.vx -= impulse * nx;
                  a.vy -= impulse * ny;
                }
                if (!cDragging) {
                  c.vx += impulse * nx;
                  c.vy += impulse * ny;
                }
              }
            }
          }
        }

        bubbles.forEach((b, i) => {
          const el = bubbleRefs.current[i];
          if (!el) return;
          const isDragging = draggingRef.current?.index === i;
          el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0) scale(${
            isDragging ? 1.12 : 1
          })`;
          el.style.width = `${b.r * 2}px`;
          el.style.height = `${b.r * 2}px`;
          el.style.zIndex = isDragging ? '30' : '10';
        });
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const playGenre = useCallback(async (genreName: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (selectedGenre === genreName) {
      audio.pause();
      setSelectedGenre(null);
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    setSelectedGenre(genreName);
    audio.src = `/genre-showcase/${encodeURIComponent(`${genreName}.mp3`)}`;
    audio.load();

    try {
      await audio.play();
    } catch (error) {
      console.error('Genre playback failed:', error);
    }
  }, [selectedGenre]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setSelectedGenre(null);
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, []);

  const handlePointerDown = (
    index: number,
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    const b = physicsRef.current[index];
    const container = containerRef.current;
    if (!b || !container) return;

    const rect = container.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;

    draggingRef.current = {
      index,
      offsetX: px - b.x,
      offsetY: py - b.y,
      lastX: px,
      lastY: py,
      lastT: performance.now(),
      vx: 0,
      vy: 0,
      moved: false,
      startX: px,
      startY: py,
      startT: performance.now(),
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = draggingRef.current;
    const container = containerRef.current;
    if (!drag || !container) return;

    const rect = container.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;

    const now = performance.now();
    const dt = Math.max(1, now - drag.lastT);

    const rawVx = ((px - drag.lastX) / dt) * 16;
    const rawVy = ((py - drag.lastY) / dt) * 16;
    // Smooth the velocity across recent frames instead of trusting only
    // the very last one — a real flick often decelerates right at
    // release, so a raw last-frame reading kills small, quick throws.
    drag.vx = drag.vx * 0.6 + rawVx * 0.4;
    drag.vy = drag.vy * 0.6 + rawVy * 0.4;
    drag.lastX = px;
    drag.lastY = py;
    drag.lastT = now;

    if (Math.hypot(px - drag.startX, py - drag.startY) > 4) {
      drag.moved = true;
    }

    const b = physicsRef.current[drag.index];
    if (b) {
      b.x = px - drag.offsetX;
      b.y = py - drag.offsetY;
      b.vx = 0;
      b.vy = 0;
    }
  };

  const handlePointerUp = (
    index: number,
    genreName: string,
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    const drag = draggingRef.current;
    if (!drag) return;

    const b = physicsRef.current[index];
    const wasClick =
      !drag.moved && performance.now() - drag.startT < 350;

    if (b) {
      // small release boost so even a light, quick drag reads as a
      // satisfying throw rather than a shrug
      b.vx = drag.vx * 1.15;
      b.vy = drag.vy * 1.15;
    }

    draggingRef.current = null;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // no-op — pointer capture may already be released
    }

    if (wasClick) {
      playGenre(genreName);
    }
  };

  return (
    <section className="w-full min-w-0 overflow-hidden">
      <audio ref={audioRef} preload="metadata" />

      <div className="mb-9 px-1">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
          Sound Palette
        </p>

        <p className="max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
          A moving collection of sounds. Drag a bubble to throw it, or click one to hear it.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto h-[420px] w-full touch-none overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#080809] sm:h-[520px] md:h-[620px]"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />

        {ready &&
          genres.map((genre, index) => {
            const isSelected = selectedGenre === genre.name;

            return (
              <button
                key={genre.name}
                ref={(el) => {
                  bubbleRefs.current[index] = el;
                }}
                type="button"
                onPointerDown={(e) => handlePointerDown(index, e)}
                onPointerMove={handlePointerMove}
                onPointerUp={(e) => handlePointerUp(index, genre.name, e)}
                onPointerCancel={(e) => handlePointerUp(index, genre.name, e)}
                className={`group/bubble absolute left-0 top-0 z-10 flex touch-none cursor-grab items-center justify-center rounded-full text-center active:cursor-grabbing ${
                  isSelected
                    ? 'ring-2 ring-white ring-offset-4 ring-offset-[#080809]'
                    : ''
                }`}
                style={{ willChange: 'transform' }}
              >
                <div
                  className="bubble-pop relative flex h-full w-full items-center justify-center overflow-hidden rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                  style={{ backgroundImage: bubbleGradients[index % bubbleGradients.length] }}
                >
                  <div
                    className="bubble-sheen pointer-events-none absolute inset-[-40%] opacity-70"
                    style={{
                      backgroundImage:
                        'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.65) 7%, transparent 22%, transparent 100%)',
                    }}
                  />
                  <span
                    className={`relative max-w-[78%] text-[9px] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-black md:text-[10px] ${
                      genre.name.length > 13 ? 'md:text-[9px]' : ''
                    }`}
                  >
                    {genre.name}
                  </span>
                </div>
              </button>
            );
          })}

        <AnimatePresence>
          {selectedGenre && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: SMOOTH_EASE }}
              className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2"
            >
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/70 px-5 py-3 backdrop-blur-xl">
                <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white">
                  {selectedGenre}
                </span>
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                  Playing
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ============================================================= */
/* GALLERY — grid + a smooth shared-element lightbox with        */
/* backdrop blur and prev/next navigation.                       */
/*                                                                */
/* The box resizes to match whichever image is currently showing */
/* (locking it to only the first-opened image made landscape     */
/* photos shrink to a sliver inside a tall portrait-shaped box —  */
/* that's the "images look clipped/too small" issue). The jank    */
/* from before wasn't the resizing itself, it was resizing via a  */
/* bouncy spring AT THE SAME TIME as the image crossfade — two    */
/* differently-timed animations landing at different moments.    */
/* Now both the box resize and the image crossfade use the same   */
/* short, no-overshoot tween so they finish together as one       */
/* single, clean motion instead of two competing ones.            */
/* ============================================================= */

function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // The index of the thumbnail that was actually clicked to open the
  // lightbox. The shared-element (layoutId) animation stays anchored
  // to THIS index the whole time the lightbox is open, and the box's
  // size is derived from THIS image only — never from lightboxIndex —
  // so paging through prev/next never re-triggers the open/close
  // grow-and-shrink animation. Only the image inside crossfades.
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  // Real dimensions of each image. Preloaded for every gallery image up
  // front (see the effect below) so the lightbox box size is known
  // immediately on open instead of snapping once the full-res image
  // finishes loading.
  const dimsRef = useRef<Record<string, { w: number; h: number }>>({});
  const [dimsVersion, setDimsVersion] = useState(0);
  const recordDims = useCallback(
    (src: string) => (event: React.SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;
      if (!img.naturalWidth || !img.naturalHeight) return;
      const existing = dimsRef.current[src];
      if (existing && existing.w === img.naturalWidth && existing.h === img.naturalHeight) {
        return;
      }
      dimsRef.current[src] = { w: img.naturalWidth, h: img.naturalHeight };
      setDimsVersion((v) => v + 1);
    },
    []
  );

  useEffect(() => {
    let cancelled = false;
    galleryImages.forEach((src) => {
      const img = new window.Image();
      img.onload = () => {
        if (cancelled || !img.naturalWidth || !img.naturalHeight) return;
        const existing = dimsRef.current[src];
        if (existing && existing.w === img.naturalWidth && existing.h === img.naturalHeight) {
          return;
        }
        dimsRef.current[src] = { w: img.naturalWidth, h: img.naturalHeight };
        setDimsVersion((v) => v + 1);
      };
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  useEffect(() => {
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Recomputed per lightboxIndex so the box actually matches whatever
  // photo is showing — a landscape shot gets a landscape box, a
  // portrait shot gets a portrait box, instead of every image being
  // squeezed into whichever shape was clicked first.
  const lightboxBox = useMemo(() => {
    if (lightboxIndex === null) return null;
    const src = galleryImages[lightboxIndex];
    const dims = dimsRef.current[src];
    const isMobile = viewport.w < 640;
    const maxW = Math.min(viewport.w * (isMobile ? 0.94 : 0.88), 1400);
    const maxH = viewport.h * (isMobile ? 0.68 : 0.78);
    const ratio = dims ? dims.w / dims.h : 1.5;

    let width = maxW;
    let height = width / ratio;
    if (height > maxH) {
      height = maxH;
      width = height * ratio;
    }
    return { width, height };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, viewport, dimsVersion]);

  const openAt = useCallback((index: number) => {
    setOpenedIndex(index);
    setLightboxIndex(index);
  }, []);

  const close = useCallback(() => {
    setLightboxIndex(null);
    setOpenedIndex(null);
  }, []);
  const showPrev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length
      ),
    []
  );
  const showNext = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i + 1) % galleryImages.length
      ),
    []
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, close, showPrev, showNext]);

  // Simple swipe support so prev/next also works on mobile without
  // hunting for the small arrow buttons.
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) showPrev();
      else showNext();
    }
  };

  return (
    <div className="relative">
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {galleryImages.map((src, index) => (
          <motion.button
            key={src}
            type="button"
            onClick={() => openAt(index)}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 text-left"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: SMOOTH_EASE }}
          >
            <AssetImage
              src={src}
              alt={`Dilliboy gallery image ${index + 1}`}
              className="hover-scale-smooth block h-auto w-full object-cover"
              onLoad={recordDims(src)}
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && openedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: SMOOTH_EASE }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition-colors hover:border-white/40"
            >
              ✕
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition-colors hover:border-white/40 md:left-6"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition-colors hover:border-white/40 md:right-6"
            >
              ›
            </button>

            {/*
              Swapped the shared-element (layoutId) "grow out of the
              exact thumbnail" effect for a simpler centered scale+fade.
              The grid uses a CSS multi-column masonry layout, and
              Framer's FLIP has to measure every layoutId'd thumbnail in
              that layout to do the shared transition — that measuring
              is what was making the open feel janky/slow no matter how
              the transition itself was tuned. This version has nothing
              to measure: the box is already centered by the flex
              backdrop below, so "expand into the centre" is just a
              clean scale-up + fade-in on the box itself — cheap, and
              its speed is fully controlled by the transition below.
              `layout` (no id) is kept only so the box still resizes
              smoothly on prev/next as lightboxBox changes — that's a
              single element with nothing else sharing its layout group,
              so it stays fast.
            */}
            <motion.div
              layout
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950"
              style={{
                width: lightboxBox?.width,
                height: lightboxBox?.height,
              }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: SMOOTH_EASE }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence initial={false} mode="sync">
                <motion.img
                  key={lightboxIndex}
                  src={galleryImages[lightboxIndex]}
                  alt={`Dilliboy gallery image ${lightboxIndex + 1}`}
                  className="absolute inset-0 h-full w-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: SMOOTH_EASE }}
                  onLoad={recordDims(galleryImages[lightboxIndex])}
                />
              </AnimatePresence>
            </motion.div>

            {/* filmstrip — previous / next preview */}
            <div
              className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {[-1, 0, 1].map((offset) => {
                const idx =
                  (lightboxIndex + offset + galleryImages.length) %
                  galleryImages.length;
                return (
                  <button
                    key={`${idx}-${offset}`}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className={`h-12 w-16 overflow-hidden rounded-lg border transition-all duration-300 ${
                      offset === 0
                        ? 'border-white opacity-100'
                        : 'border-white/15 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <AssetImage
                      src={galleryImages[idx]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================= */
/* HERO SIDE FLOW — faint, looping columns of gallery imagery    */
/* framing the hero, like water drifting past the edges.         */
/* ============================================================= */

function HeroSideFlow() {
  const leftImages = useMemo(() => [...galleryImages].slice(0, 6), []);
  const rightImages = useMemo(
    () => [...galleryImages].slice(5, 11).reverse(),
    []
  );

  const renderColumn = (images: string[], direction: 'up' | 'down') => (
    <div className="relative h-full w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
      <div
        className="flex flex-col gap-4"
        style={{
          animation: `${direction === 'up' ? 'fountain-up' : 'fountain-down'} 26s linear infinite`,
        }}
      >
        {[...images, ...images].map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="h-24 w-16 shrink-0 overflow-hidden rounded-xl md:h-28 md:w-20"
          >
            <AssetImage
              src={src}
              alt=""
              className="h-full w-full object-cover grayscale"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="pointer-events-none absolute inset-0 hidden opacity-[0.16] blur-[1px] md:block">
      <div className="absolute bottom-8 left-4 top-8 w-16 lg:left-10 lg:w-20">
        {renderColumn(leftImages, 'up')}
      </div>
      <div className="absolute bottom-8 right-4 top-8 w-16 lg:right-10 lg:w-20">
        {renderColumn(rightImages, 'down')}
      </div>
    </div>
  );
}

/* ============================================================= */
/* CUSTOM CURSOR — tracks with mousemove (unaffected by text      */
/* selection drags), hides cleanly over iframes instead of        */
/* freezing, and only ever disappears when the pointer truly      */
/* leaves the window.                                             */
/* ============================================================= */

function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 38, mass: 0.35 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 38, mass: 0.35 });

  useEffect(() => {
    setMounted(true);

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('.cursor-native-zone')) {
        setVisible(false);
        return;
      }

      const interactiveElement = target.closest(
        "a, button, [role='button'], input, textarea, select"
      );
      setInteractive(!!interactiveElement);
    };

    // Reliable "left the window" detection — mouseleave/pointerleave on
    // document fire inconsistently (e.g. while selecting text, or when
    // the pointer crosses into an iframe), which is what caused the
    // cursor to vanish or freeze. relatedTarget === null on the html
    // element is the standard trick for "actually left the viewport".
    const handleDocumentMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        setVisible(false);
      }
    };

    const handleWindowBlur = () => setVisible(false);
    const handleWindowFocus = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseout', handleDocumentMouseOut);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseout', handleDocumentMouseOut);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex items-center justify-center rounded-full border"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        initial={{ width: 78, height: 78, opacity: 0, scale: 0.7 }}
        animate={{
          width: interactive ? 108 : 78,
          height: interactive ? 108 : 78,
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.7,
          borderColor: interactive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
          backgroundColor: interactive
            ? 'rgba(255,255,255,0.07)'
            : 'rgba(255,255,255,0.015)',
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 30, mass: 0.45 }}
      >
        <motion.div
          className="absolute rounded-full bg-white"
          animate={{
            width: interactive ? 5 : 6,
            height: interactive ? 5 : 6,
            scale: interactive ? 0 : 1,
            opacity: interactive ? 0 : 1,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        />

        <motion.div
          className="absolute flex items-center justify-center"
          animate={{
            scale: interactive ? 1 : 0,
            rotate: interactive ? 45 : 0,
            opacity: interactive ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 24, mass: 0.35 }}
        >
          <div className="h-3 w-3 border-l border-t border-white" />
          <div className="absolute h-3 w-3 border-r border-b border-white" />
        </motion.div>

        <motion.div
          className="absolute h-8 w-8 rounded-full border border-white/20"
          animate={{
            scale: interactive ? 1 : 0.65,
            rotate: interactive ? 90 : 0,
            opacity: interactive ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block rounded-full border border-white/10"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: interactive ? 138 : 112,
          height: interactive ? 138 : 112,
          opacity: visible ? 0.45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 32, mass: 0.5 }}
      />
    </>
  );
}

/* ============================================================= */
/* NAV ICONS                                                      */
/* ============================================================= */

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SpotifyIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.36-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.72-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function MenuIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

/* ============================================================= */
/* PAGE                                                            */
/* ============================================================= */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open, same treatment as
  // the gallery lightbox.
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    // Close the menu first, then kick off the scroll on the next frame
    // so the layout settles (menu panel unmounting) before we measure
    // the target section's position — otherwise the offset can be
    // calculated against the pre-close layout and land slightly off.
    requestAnimationFrame(() => smoothScrollToId(id));
  };

  const navItems: [string, string][] = [
    ['about', 'About'],
    ['music', 'Music'],
    ['work', 'Work'],
    ['live', 'Live'],
    ['genres', 'Genres'],
    ['services', 'Services'],
    ['gallery', 'Gallery'],
    ['contact', 'Contact'],
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <GlobalStyles />
      <CustomCursor />

      <nav
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? 'border-white/10 bg-black/80 shadow-[0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-2xl'
            : 'border-white/5 bg-black/40 backdrop-blur-xl'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="relative font-bold tracking-[0.2em]"
          >
            DILLIBOY
          </button>

          <div className="hidden gap-7 md:flex">
            {navItems.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className="group relative text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-white"
              >
                {label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/dilliboymusic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dilliboy on Instagram"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="https://open.spotify.com/artist/37KYCGXSG8pWVFC0fQbWoh?si=o5ngFjbgQ0aUutaapku-aGA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dilliboy on Spotify"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <SpotifyIcon className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="hidden rounded-full border border-white/15 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-all hover:border-white hover:bg-white hover:text-black sm:block"
            >
              Let's Work
            </button>

            {/*
              Mobile nav trigger. Previously the nav links were
              `hidden md:flex` and the "Let's Work" CTA was
              `hidden sm:block`, which meant phone visitors (below the
              sm breakpoint) had literally no way to jump to a section
              other than manually scrolling — the whole nav bar was
              invisible to them. This button + panel restores that
              navigation on small screens.
            */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="h-4 w-4" />
              ) : (
                <MenuIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: SMOOTH_EASE }}
              className="overflow-hidden border-b border-white/10 bg-black/95 backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col px-4 py-4 sm:px-6">
                {navItems.map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className="border-b border-white/5 py-4 text-left text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300 transition-colors last:border-b-0 hover:text-white active:text-yellow-400"
                  >
                    {label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="mt-5 rounded-full border border-white/20 bg-white px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-black"
                >
                  Let's Work
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-15%] top-[-15%] h-[550px] w-[550px] rounded-full bg-yellow-500/[0.08] blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-500/[0.07] blur-[130px]" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:80px_80px]" />
        </div>

        <HeroSideFlow />

        <div className="relative z-10 max-w-6xl text-center">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-zinc-600">
            Music Producer · DJ · Sound Designer
          </p>

          {/*
            clamp() instead of a bare 18vw: on very narrow phones 18vw
            of an 8-letter word can crowd the safe-area edges, and on
            very wide desktop screens 18vw runs away to an oversized
            wordmark. clamp gives a sane floor/ceiling while still
            scaling fluidly with the viewport in between.
          */}
          <h1
            className="font-black leading-[0.75] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(3.2rem, 18vw, 12rem)' }}
          >
            DILLIBOY
          </h1>

          <p className="mt-8 text-sm uppercase tracking-[0.45em] text-zinc-500 md:text-base">
            MUSIC / SOUND / CULTURE
          </p>

          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToSection('music')}
              className="bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-yellow-400"
            >
              Listen to Beats
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="border border-white/20 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:border-white hover:bg-white/5"
            >
              Get in Touch
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.3em] text-zinc-700">
          Scroll to explore
        </div>
      </section>

      <section id="about" className="border-t border-white/5 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex items-end justify-between gap-8">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-400">
                01 — About
              </p>
              <h2 className="text-5xl font-black tracking-[-0.02em] md:text-7xl">
                ABOUT
              </h2>
            </div>
            <p className="hidden max-w-xs text-right text-xs uppercase leading-5 tracking-[0.18em] text-zinc-600 md:block">
              Music. Sound. Visual storytelling.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="group overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950">
                <AssetImage
                  src="/about/About.jpeg"
                  alt="Dilliboy"
                  eager
                  className="hover-scale-smooth aspect-[4/3] w-full object-cover grayscale group-hover:grayscale-0"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-2xl font-medium leading-tight text-zinc-200 md:text-3xl">
                Music Producer, DJ, Sound Designer Creating Music & Audio For Artists, Film, Games, Advertising, & Branding Content.
              </p>

              <p className="mt-7 text-sm leading-7 text-zinc-500">
                Based in Delhi, India with a global audience. I move between
                artistic, cinematic, commercial and experimental briefs, turning
                creative direction into finished sound.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-yellow-400">
                    Genres
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    Hip-Hop · R&B · Soul · Trap · Electronic · Experimental
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-yellow-400">
                    Collaborators
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    Sez On The Beat · Tricksingh · Yungsta · Raga · Encore ·
                    Rebel 7
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-yellow-400">
                  Labels & Platforms
                </p>
                <p className="mt-3 text-sm text-zinc-300">
                  Mass Appeal India · Big Bang Records · Azadi Records ·
                  Netflix India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="music" className="border-t border-white/5 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-400">
                02 — Original Music
              </p>
              <h2 className="text-5xl font-black tracking-[-0.05em] md:text-7xl">
                ORIGINAL BEATS
              </h2>
            </div>

            <p className="hidden text-right text-xs uppercase tracking-[0.2em] text-zinc-600 md:block">
              Premium Production Available For Licensing
            </p>
          </div>

          <BeatPlayer />
        </div>
      </section>

      <section id="work" className="border-t border-white/5 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-400">
              03 — Selected Work
            </p>
            <h2 className="text-5xl font-black tracking-[-0.05em] md:text-7xl">
              FEATURED TRACKS
            </h2>
          </div>

          <FeaturedTracks />
        </div>
      </section>

      <section id="experience" className="border-t border-white/5 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-400">
              04 — Industry
            </p>
            <h2 className="text-5xl font-black tracking-[-0.05em] md:text-7xl">
              EXPERIENCE
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <ExperienceCard
              logo="/logos/Suno.png"
              logoAlt="Suno AI"
              title="Suno AI"
              role="Music Producer & Content Creator"
              period="Sep 2025 – Nov 2025"
              description="Produced music and content within an AI music environment, applying production knowledge, genre fluency and critical listening to shape musical outputs."
              accent="from-orange-500/10 via-transparent to-transparent"
            />

            <ExperienceCard
              logo="/logos/Netflix.webp"
              logoAlt="Netflix"
              title="Netflix India"
              role="Music Producer · Foley · Sound Designer"
              period="Phir Aayi Haseen Dilruba"
              description="Created original music, foley and sound design for promotional content, building audio around the visual narrative and creative direction."
              accent="from-red-600/15 via-transparent to-transparent"
              href="https://www.instagram.com/reels/C-uEUSjSbZO/"
            />
          </div>
        </div>
      </section>

      <section id="live" className="border-t border-white/5 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-400">
              05 — Live
            </p>
            <h2 className="text-5xl font-black tracking-[-0.05em] md:text-7xl">
              DJ / LIVE PERFORMANCE
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <PerformanceCard
              title="Wreckfest"
              year="2024"
              location="Mumbai, India"
              description="Performed alongside Karan Kanchan, Ritviz, Chaar Diwari, Amin Jazz & more at Wreckfest 2024."
              image="/media/Wreckfest.jpg"
              video="https://www.youtube.com/embed/_QSBF4qawEs"
            />

            <PerformanceCard
              title="The Yaksha Show"
              year="2026"
              location="Delhi, India"
              description="Performed alongside Purab Paschim and IMO Clan at the Prelude to The Yaksha Show in May 2026."
              image="/media/The Yaksha Show.jpg"
              video="https://www.youtube.com/embed/2IWZtWcsmGQ"
            />
          </div>
        </div>
      </section>

      <section id="releases" className="border-t border-white/5 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-400">
              06 — New Music
            </p>
            <h2 className="text-5xl font-black tracking-[-0.05em] md:text-7xl">
              LATEST RELEASES
            </h2>
          </div>

          <LatestReleases />
        </div>
      </section>

      <section id="genres" className="border-t border-white/5 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-400">
              07 — Range
            </p>
            <h2 className="text-5xl font-black tracking-[-0.05em] md:text-7xl">
              GENRE SHOWCASE
            </h2>
          </div>

          <GenreShowcase />
        </div>
      </section>

      <section id="services" className="border-t border-white/5 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-400">
              08 — What I Do
            </p>
            <h2 className="text-5xl font-black tracking-[-0.05em] md:text-7xl">
              SERVICES
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              {
                number: '01',
                title: 'Music Production',
                description:
                  'Original beat creation and production for artists across genres.',
              },
              {
                number: '02',
                title: 'Sound Design',
                description:
                  'Custom audio, foley and sound design for visual storytelling.',
              },
              {
                number: '03',
                title: 'Film, Games & Advertising',
                description:
                  'Complete music and audio solutions for visual media and branded content.',
              },
            ].map((service) => (
              <div
                key={service.number}
                className="group bg-black p-7 transition-colors duration-500 hover:bg-zinc-950 md:p-9"
              >
                <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-700">
                  {service.number}
                </p>
                <h3 className="mt-6 text-2xl font-black tracking-tight transition-colors group-hover:text-yellow-400">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-zinc-500">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="border-t border-white/5 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-400">
              09 — Visuals
            </p>
            <h2 className="text-5xl font-black tracking-[-0.05em] md:text-7xl">
              GALLERY
            </h2>
          </div>

          <Gallery />
        </div>
      </section>

      <section id="contact" className="border-t border-white/5 px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-400">
              10 — Contact
            </p>

            <h2 className="text-6xl font-black tracking-[-0.025em] md:text-8xl">
              LET&apos;S CREATE
              <br />
              TOGETHER.
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-zinc-500">
              Open to collaborations, commissions, music production, sound
              design and creative projects.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-5">
              <a
                href="mailto:dilliboybeats@gmail.com"
                className="text-xl font-bold transition-colors hover:text-yellow-400 md:text-2xl"
              >
                dilliboybeats@gmail.com
              </a>

              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                Delhi, India
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a
                  href="https://instagram.com/dilliboymusic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 transition-all hover:border-white/40 hover:text-white"
                >
                  Instagram
                </a>

                <a
                  href="https://open.spotify.com/artist/37KYCGXSG8pWVFC0fQbWoh?si=o5ngFjbgQ0aUutaapku-aGA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 transition-all hover:border-white/40 hover:text-white"
                >
                  Spotify
                </a>
              </div>

              <a
                href="https://forms.gle/w33XdLvRaWB5yERF9"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 border border-white/30 bg-white/5 px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white"
              >
                Send Enquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold tracking-[0.2em]">DILLIBOY</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-zinc-700">
              Music Producer · DJ · Sound Designer · Delhi, India
            </p>
          </div>

          <div className="flex gap-5">
            <a
              href="https://instagram.com/dilliboymusic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 transition-colors hover:text-white"
            >
              Instagram
            </a>
            <a
              href="https://open.spotify.com/artist/37KYCGXSG8pWVFC0fQbWoh?si=o5ngFjbgQ0aUutaapku-aGA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 transition-colors hover:text-white"
            >
              Spotify
            </a>
            <a
              href="mailto:dilliboybeats@gmail.com"
              className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 transition-colors hover:text-white"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
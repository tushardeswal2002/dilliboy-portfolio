'use client';

import { useState, useEffect, useRef } from 'react';
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

const genres: Genre[] = [
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
].map((name) => ({
  name,
  filename: `${name}.mp3`,
}));

const genrePositions = [
  { x: 4, y: 10, size: 132, delay: '-2s', duration: '18s' },
  { x: 17, y: 42, size: 112, delay: '-8s', duration: '22s' },
  { x: 29, y: 4, size: 104, delay: '-13s', duration: '20s' },
  { x: 38, y: 55, size: 140, delay: '-5s', duration: '24s' },
  { x: 50, y: 15, size: 118, delay: '-17s', duration: '19s' },
  { x: 60, y: 61, size: 106, delay: '-9s', duration: '23s' },
  { x: 72, y: 6, size: 142, delay: '-4s', duration: '21s' },
  { x: 84, y: 45, size: 114, delay: '-14s', duration: '25s' },
  { x: 8, y: 73, size: 108, delay: '-10s', duration: '20s' },
  { x: 22, y: 18, size: 94, delay: '-16s', duration: '26s' },
  { x: 34, y: 77, size: 118, delay: '-7s', duration: '18s' },
  { x: 47, y: 36, size: 96, delay: '-12s', duration: '22s' },
  { x: 56, y: 79, size: 128, delay: '-3s', duration: '24s' },
  { x: 68, y: 30, size: 100, delay: '-19s', duration: '20s' },
  { x: 78, y: 74, size: 124, delay: '-6s', duration: '23s' },
  { x: 91, y: 18, size: 98, delay: '-11s', duration: '19s' },
  { x: 12, y: 34, size: 126, delay: '-15s', duration: '25s' },
  { x: 27, y: 63, size: 100, delay: '-1s', duration: '21s' },
  { x: 43, y: 8, size: 110, delay: '-18s', duration: '26s' },
  { x: 63, y: 45, size: 116, delay: '-20s', duration: '22s' },
  { x: 74, y: 58, size: 94, delay: '-9s', duration: '20s' },
  { x: 88, y: 70, size: 136, delay: '-16s', duration: '24s' },
  { x: 3, y: 53, size: 92, delay: '-5s', duration: '19s' },
  { x: 54, y: 2, size: 102, delay: '-13s', duration: '23s' },
];

function AssetImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [source, setSource] = useState(src);

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
      className={className}
    />
  );
}

function BeatPlayer() {
  const [currentBeat, setCurrentBeat] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  /*
   * We only show 5 cards at once.
   * All beats still exist in the player.
   */
  const VISIBLE_BEATS = 5;

  /*
   * Figure out where the visible window should begin.
   *
   * When no beat is selected:
   * show beats 1–5.
   *
   * When a beat is selected:
   * keep it roughly centered whenever possible.
   */
  const currentIndex = currentBeat
    ? beats.findIndex((beat) => beat.id === currentBeat)
    : 0;

  const maxStartIndex = Math.max(
    0,
    beats.length - VISIBLE_BEATS
  );

  const startIndex = Math.min(
    Math.max(
      0,
      currentIndex - Math.floor(VISIBLE_BEATS / 2)
    ),
    maxStartIndex
  );

  const visibleBeats = beats.slice(
    startIndex,
    startIndex + VISIBLE_BEATS
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );
    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );
    audio.addEventListener(
      "durationchange",
      handleDurationChange
    );
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );
      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      audio.removeEventListener(
        "durationchange",
        handleDurationChange
      );
      audio.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, []);

  const playBeat = async (beatId: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    /*
     * Same beat + playing = pause.
     */
    if (
      currentBeat === beatId &&
      isPlaying
    ) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    /*
     * Same beat + paused = resume.
     */
    if (
      currentBeat === beatId &&
      !isPlaying
    ) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error(
          "Playback failed:",
          error
        );
      }

      return;
    }

    const beat = beats.find(
      (item) => item.id === beatId
    );

    if (!beat) return;

    audio.pause();

    setCurrentBeat(beatId);
    setProgress(0);
    setDuration(0);

    /*
     * encodeURIComponent is important because
     * filenames such as G#m contain #.
     */
    audio.src = `/beats/${encodeURIComponent(
      beat.filename
    )}`;

    audio.load();

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error(
        "Playback failed:",
        error
      );
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  /*
   * Click anywhere on the progress bar
   * to jump to that point in the beat.
   */
  const handleProgressClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const audio = audioRef.current;

    if (
      !audio ||
      !duration ||
      !Number.isFinite(duration)
    ) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const clickPosition =
      (event.clientX - rect.left) /
      rect.width;

    const clampedPosition = Math.min(
      1,
      Math.max(0, clickPosition)
    );

    const newTime =
      clampedPosition * duration;

    audio.currentTime = newTime;
    setProgress(newTime);
  };

  /*
   * Keep the visual language of the existing player.
   * Each beat gets its own atmosphere.
   */
  const gradients = [
    "linear-gradient(135deg, #20252d 0%, #34445c 52%, #151b27 100%)",
    "linear-gradient(135deg, #24205c 0%, #453bc4 52%, #16143b 100%)",
    "linear-gradient(135deg, #173f49 0%, #14778a 52%, #10252d 100%)",
    "linear-gradient(135deg, #4b1d48 0%, #812b76 52%, #211426 100%)",
    "linear-gradient(135deg, #593512 0%, #a95d0b 52%, #24160b 100%)",
  ];

  const glowColors = [
    "#64748b",
    "#6366f1",
    "#06b6d4",
    "#d946ef",
    "#f59e0b",
  ];

  return (
    <section className="w-full min-w-0 overflow-visible">
      <audio
        ref={audioRef}
        preload="metadata"
      />

      {/* SECTION HEADER */}

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

      {/* PLAYER */}

      <div
        className="grid h-[320px] w-full min-w-0 gap-2 overflow-visible md:gap-3"
        style={{
          /*
           * ALWAYS five columns.
           *
           * Active beat gets 2.7x the space.
           * The other four stay comfortably readable.
           */
          gridTemplateColumns:
            currentBeat === null
              ? "repeat(5, minmax(0, 1fr))"
              : visibleBeats
                  .map((beat) =>
                    beat.id === currentBeat
                      ? "minmax(0, 2.7fr)"
                      : "minmax(0, 1fr)"
                  )
                  .join(" "),

          /*
           * Smoothly animate the cards when
           * the active beat changes.
           */
          transition:
            "grid-template-columns 780ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {visibleBeats.map(
          (beat, visibleIndex) => {
            const actualIndex =
              startIndex + visibleIndex;

            const isActive =
              currentBeat === beat.id;

            const inactiveTitleSize =
              beat.name.length > 15
                ? "text-[12px] md:text-[14px]"
                : beat.name.length > 11
                  ? "text-[13px] md:text-[16px]"
                  : "text-[14px] md:text-[18px]";

            return (
              <motion.div
                key={beat.id}
                className="relative min-w-0 overflow-hidden rounded-[24px]"
                layout
                transition={{
                  layout: {
                    duration: 0.78,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                style={{
                  backgroundImage:
                    gradients[
                      actualIndex %
                        gradients.length
                    ],
                }}
              >
                {/* ====================================== */}
                {/* COLOUR / ATMOSPHERE                   */}
                {/* ====================================== */}

                <motion.div
                  className="pointer-events-none absolute inset-0"
                  animate={{
                    opacity: isActive
                      ? 0.08
                      : 0.22,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.78) 100%)",
                  }}
                />

                <motion.div
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
                  style={{
                    background:
                      glowColors[
                        actualIndex %
                          glowColors.length
                      ],
                  }}
                  animate={{
                    scale: isActive
                      ? 1.3
                      : 0.9,
                    opacity: isActive
                      ? 0.48
                      : 0.25,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />

                {/* INNER HIGHLIGHT */}

                <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/[0.07] via-transparent to-black/20" />

                {/* BORDER */}

                <motion.div
                  className="pointer-events-none absolute inset-0 z-50 rounded-[24px] border"
                  animate={{
                    borderColor: isActive
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(255,255,255,0.07)",
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                />

                {/* ====================================== */}
                {/* INACTIVE CARD                          */}
                {/* ====================================== */}

                {!isActive && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        playBeat(beat.id)
                      }
                      aria-label={`Play ${beat.name}`}
                      className="absolute inset-0 z-30 h-full w-full cursor-pointer"
                    />

                    <motion.div
                      className="absolute inset-0 flex min-w-0 flex-col justify-end overflow-hidden p-4 md:p-5"
                      initial={false}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [
                          0.16,
                          1,
                          0.3,
                          1,
                        ],
                      }}
                    >
                      {/* META */}

                      <div className="mb-3 flex min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap text-[8px] uppercase tracking-[0.12em] text-white/60 md:text-[9px]">
                        <span className="shrink-0">
                          {String(
                            actualIndex + 1
                          ).padStart(2, "0")}
                        </span>

                        <span className="h-px w-3 shrink-0 bg-white/25" />

                        <span className="shrink-0">
                          {beat.bpm} BPM
                        </span>

                        <span className="shrink-0">
                          {beat.key}
                        </span>
                      </div>

                      {/* TITLE */}

                      <div className="w-full min-w-0 overflow-hidden">
                        <motion.h3
                          className={`w-full whitespace-nowrap font-medium tracking-[-0.025em] text-white ${inactiveTitleSize}`}
                          initial={false}
                          animate={{
                            x: 0,
                            opacity: 1,
                          }}
                          transition={{
                            duration: 0.5,
                            ease: [
                              0.16,
                              1,
                              0.3,
                              1,
                            ],
                          }}
                        >
                          {beat.name}
                        </motion.h3>
                      </div>
                    </motion.div>
                  </>
                )}

                {/* ====================================== */}
                {/* ACTIVE CARD                            */}
                {/* ====================================== */}

                <motion.div
                  className="absolute inset-0 z-20 overflow-hidden"
                  initial={false}
                  animate={{
                    opacity: isActive
                      ? 1
                      : 0,
                  }}
                  transition={{
                    duration: 0.42,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  style={{
                    pointerEvents: isActive
                      ? "auto"
                      : "none",
                  }}
                >
                  {/* TOP META */}

                  <motion.div
                    className="absolute left-6 right-6 top-6 flex min-w-0 items-center justify-between gap-5 overflow-hidden"
                    initial={false}
                    animate={{
                      opacity: isActive
                        ? 1
                        : 0,
                      y: isActive
                        ? 0
                        : -10,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: 0.08,
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                  >
                    <div className="flex min-w-0 items-center gap-3 overflow-hidden whitespace-nowrap">
                      <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.28em] text-white/80">
                        Original Beat
                      </span>

                      <span className="h-1 w-1 shrink-0 rounded-full bg-white/35" />

                      <span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-white/60">
                        {beat.bpm} BPM ·{" "}
                        {beat.key}
                      </span>
                    </div>

                    {/* WAVEFORM */}

                    <div className="flex h-8 shrink-0 items-center gap-[3px]">
                      {[
                        3,
                        5,
                        8,
                        12,
                        18,
                        24,
                        15,
                        20,
                        28,
                        18,
                        11,
                        7,
                        14,
                        22,
                        17,
                        9,
                        5,
                      ].map(
                        (
                          height,
                          i
                        ) => (
                          <motion.span
                            key={i}
                            className="block w-[2px] rounded-full bg-white/80"
                            animate={{
                              height:
                                isPlaying
                                  ? [
                                      `${Math.max(
                                        3,
                                        height *
                                          0.35
                                      )}px`,
                                      `${height}px`,
                                      `${Math.max(
                                        3,
                                        height *
                                          0.5
                                      )}px`,
                                    ]
                                  : `${Math.max(
                                      3,
                                      height *
                                        0.35
                                    )}px`,
                            }}
                            transition={{
                              duration:
                                0.7 +
                                i *
                                  0.025,
                              repeat:
                                isPlaying
                                  ? Infinity
                                  : 0,
                              repeatType:
                                "mirror",
                              ease:
                                "easeInOut",
                            }}
                          />
                        )
                      )}
                    </div>
                  </motion.div>

                  {/* ACTIVE TITLE */}

                  <motion.div
                    className="absolute bottom-[92px] left-6 right-6 min-w-0 overflow-hidden"
                    initial={false}
                    animate={{
                      opacity: isActive
                        ? 1
                        : 0,
                      x: isActive
                        ? 0
                        : 22,
                    }}
                    transition={{
                      duration: 0.52,
                      delay: isActive
                        ? 0.1
                        : 0,
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                  >
                    <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-3xl font-medium tracking-[-0.025em] text-white md:text-5xl">
                      {beat.name}
                    </h3>

                    <motion.p
                      className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50"
                      animate={{
                        opacity: isActive
                          ? 1
                          : 0,
                        y: isActive
                          ? 0
                          : 5,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: 0.2,
                        ease: [
                          0.16,
                          1,
                          0.3,
                          1,
                        ],
                      }}
                    >
                      DILLIBOY
                    </motion.p>
                  </motion.div>

                  {/* PLAY / PAUSE */}

                  <motion.button
                    type="button"
                    onClick={() =>
                      playBeat(beat.id)
                    }
                    aria-label={
                      isPlaying
                        ? `Pause ${beat.name}`
                        : `Play ${beat.name}`
                    }
                    className="absolute bottom-6 left-6 z-40 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-black/20"
                    whileHover={{
                      scale: 1.06,
                    }}
                    whileTap={{
                      scale: 0.94,
                    }}
                    transition={{
                      duration: 0.18,
                      ease: "easeOut",
                    }}
                  >
                    {isPlaying ? (
                      <div className="flex items-center gap-[3px]">
                        <span className="h-4 w-[2px] rounded-full bg-black" />
                        <span className="h-4 w-[2px] rounded-full bg-black" />
                      </div>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="ml-0.5 h-4 w-4 fill-current"
                      >
                        <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l10-6.86a1 1 0 0 0 0-1.72l-10-6.86A1 1 0 0 0 8 5.14Z" />
                      </svg>
                    )}
                  </motion.button>

                  {/* TIME + PROGRESS */}

                  <div className="absolute bottom-7 left-[92px] right-6 min-w-0 overflow-visible">
                    <div className="mb-2 flex min-w-0 justify-between gap-4 text-[9px] uppercase tracking-[0.15em] text-white/45">
                      <span className="shrink-0">
                        {formatTime(
                          progress
                        )}
                      </span>

                      <span className="shrink-0">
                        {formatTime(
                          duration
                        )}
                      </span>
                    </div>

                    {/* SEEK BAR */}

                    <div
                      onClick={
                        handleProgressClick
                      }
                      role="slider"
                      aria-label={`Seek ${beat.name}`}
                      aria-valuemin={0}
                      aria-valuemax={
                        duration || 0
                      }
                      aria-valuenow={
                        progress
                      }
                      tabIndex={
                        duration > 0
                          ? 0
                          : -1
                      }
                      className="group relative h-[8px] w-full cursor-pointer rounded-full py-[3px]"
                    >
                      <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/15 transition-all duration-200 group-hover:h-[4px]">
                        <motion.div
                          className="absolute left-0 top-0 h-full bg-white"
                          animate={{
                            width:
                              duration >
                              0
                                ? `${Math.min(
                                    100,
                                    Math.max(
                                      0,
                                      (progress /
                                        duration) *
                                        100
                                    )
                                  )}%`
                                : "0%",
                          }}
                          transition={{
                            duration: 0.1,
                            ease: "linear",
                          }}
                        />
                      </div>

                      {/* SEEK HANDLE */}

                      <motion.div
                        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
                        animate={{
                          left:
                            duration >
                            0
                              ? `${Math.min(
                                  100,
                                  Math.max(
                                    0,
                                    (progress /
                                      duration) *
                                      100
                                  )
                                )}%`
                              : "0%",
                        }}
                        style={{
                          translateX:
                            "-50%",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          }
        )}
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
          className="group flex items-center gap-5 border-b border-white/10 py-5 transition-all duration-300 hover:border-white/30"
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
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
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
          className="group flex items-center gap-5 border-b border-white/10 py-5 transition-all duration-300 hover:border-white/30"
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
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
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
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
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

        <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
          <iframe
            className="h-full w-full"
            src={video}
            title={`${title} performance`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </article>
  );
}

function GenreShowcase() {
  const genres = [
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

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const bubblePositions = [
    { x: 8, y: 8, size: 88 },
    { x: 26, y: 7, size: 98 },
    { x: 47, y: 10, size: 82 },
    { x: 68, y: 8, size: 100 },
    { x: 84, y: 12, size: 76 },

    { x: 13, y: 28, size: 100 },
    { x: 35, y: 25, size: 82 },
    { x: 55, y: 30, size: 106 },
    { x: 73, y: 27, size: 88 },

    { x: 8, y: 50, size: 82 },
    { x: 28, y: 51, size: 110 },
    { x: 49, y: 49, size: 78 },
    { x: 66, y: 50, size: 102 },
    { x: 86, y: 50, size: 82 },

    { x: 18, y: 72, size: 90 },
    { x: 39, y: 70, size: 82 },
    { x: 57, y: 72, size: 104 },
    { x: 77, y: 70, size: 84 },

    { x: 7, y: 88, size: 82 },
    { x: 27, y: 89, size: 102 },
    { x: 48, y: 87, size: 88 },
    { x: 67, y: 89, size: 98 },
    { x: 86, y: 87, size: 84 },

    { x: 58, y: 14, size: 76 },
  ];

  const bubbleColors = [
    'bg-[#f5f5f5]',
    'bg-[#e9e7ff]',
    'bg-[#e4fbff]',
    'bg-[#fff0fb]',
    'bg-[#fff3df]',
  ];

  const handleGenreClick = async (genre: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    // Clicking the currently selected genre pauses it
    if (selectedGenre === genre) {
      audio.pause();
      setSelectedGenre(null);
      return;
    }

    const filename = `${genre}.mp3`;

    audio.pause();
    audio.currentTime = 0;

    setSelectedGenre(genre);

    audio.src = `/genre-showcase/${encodeURIComponent(filename)}`;
    audio.load();

    try {
      await audio.play();
    } catch (error) {
      console.error('Genre playback failed:', error);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setSelectedGenre(null);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <section className="w-full min-w-0 overflow-hidden">
      <audio ref={audioRef} preload="metadata" />

      {/* ========================================= */}
      {/* SMALL INTRO                              */}
      {/* ========================================= */}

      <div className="mb-9 px-1">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
          Sound Palette
        </p>

        <p className="max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
          A moving collection of sounds. Click any genre to stop its motion and hear the sound.
        </p>
      </div>

      {/* ========================================= */}
      {/* BUBBLE FIELD                             */}
      {/* ========================================= */}

      <div className="relative mx-auto h-[620px] w-full overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#080809]">
        {/* subtle ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />

        {genres.map((genre, index) => {
          const position =
            bubblePositions[index % bubblePositions.length];

          const color =
            bubbleColors[index % bubbleColors.length];

          const isSelected = selectedGenre === genre;

          const movement = [
            {
              x: [0, 18, -12, 9, 0],
              y: [0, -14, 12, -8, 0],
            },
            {
              x: [0, -15, 12, -8, 0],
              y: [0, 11, -13, 7, 0],
            },
            {
              x: [0, 12, -16, 8, 0],
              y: [0, -10, 15, -7, 0],
            },
            {
              x: [0, -11, 16, -9, 0],
              y: [0, 15, -9, 11, 0],
            },
          ][index % 4];

          const duration = 5.5 + (index % 5) * 0.55;
          const delay = -(index % 7) * 0.65;

          return (
            <motion.button
              key={genre}
              type="button"
              onClick={() => handleGenreClick(genre)}
              className={`absolute z-10 flex items-center justify-center overflow-hidden rounded-full text-center shadow-[0_8px_30px_rgba(0,0,0,0.25)] ${color} ${
                isSelected
                  ? 'ring-2 ring-white ring-offset-4 ring-offset-[#080809]'
                  : ''
              }`}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                width: `${position.size}px`,
                height: `${position.size}px`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={
                isSelected
                  ? {
                      scale: [1, 1.06, 1],
                    }
                  : {
                      x: movement.x,
                      y: movement.y,
                      scale: [1, 1.025, 0.98, 1.015, 1],
                    }
              }
              transition={
                isSelected
                  ? {
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }
                  : {
                      duration,
                      delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              whileHover={
                isSelected
                  ? {
                      scale: 1.04,
                    }
                  : {
                      scale: 1.1,
                    }
              }
              whileTap={{
                scale: 0.94,
              }}
            >
              <span
                className={`max-w-[78%] text-[9px] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-black md:text-[10px] ${
                  genre.length > 13
                    ? 'md:text-[9px]'
                    : ''
                }`}
              >
                {genre}
              </span>
            </motion.button>
          );
        })}

        {/* SELECTED GENRE INDICATOR */}
        <AnimatePresence>
          {selectedGenre && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 10,
              }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
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

function Gallery() {
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

  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {galleryImages.map((src, index) => (
        <div
          key={src}
          className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-zinc-950"
        >
          <AssetImage
            src={src}
            alt={`Dilliboy gallery image ${index + 1}`}
            className="block h-auto w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:-rotate-1"
          />
        </div>
      ))}
    </div>
  );
}

function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, {
    stiffness: 500,
    damping: 38,
    mass: 0.35,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 500,
    damping: 38,
    mass: 0.35,
  });

  useEffect(() => {
    setMounted(true);

    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (!finePointer) return;

    document.documentElement.classList.add("custom-cursor-active");

    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;

      if (!target) return;

      const interactiveElement = target.closest(
        "a, button, [role='button'], input, textarea, select"
      );

      setInteractive(!!interactiveElement);
    };

    const handlePointerLeave = () => {
      setVisible(false);
    };

    const handlePointerEnter = () => {
      setVisible(true);
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerenter", handlePointerEnter);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          .custom-cursor-active,
          .custom-cursor-active * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main cursor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex items-center justify-center rounded-full border"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{
          width: 78,
          height: 78,
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          width: interactive ? 108 : 78,
          height: interactive ? 108 : 78,
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.7,
          borderColor: interactive
            ? "rgba(255,255,255,0.9)"
            : "rgba(255,255,255,0.5)",
          backgroundColor: interactive
            ? "rgba(255,255,255,0.07)"
            : "rgba(255,255,255,0.015)",
        }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 30,
          mass: 0.45,
        }}
      >
        {/* Center dot */}
        <motion.div
          className="absolute rounded-full bg-white"
          animate={{
            width: interactive ? 5 : 6,
            height: interactive ? 5 : 6,
            scale: interactive ? 0 : 1,
            opacity: interactive ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
        />

        {/* Four-point shape on hover */}
        <motion.div
          className="absolute flex items-center justify-center"
          animate={{
            scale: interactive ? 1 : 0,
            rotate: interactive ? 45 : 0,
            opacity: interactive ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 24,
            mass: 0.35,
          }}
        >
          <div className="h-3 w-3 border-l border-t border-white" />

          <div className="absolute h-3 w-3 border-r border-b border-white" />
        </motion.div>

        {/* Small rotating accent */}
        <motion.div
          className="absolute h-8 w-8 rounded-full border border-white/20"
          animate={{
            scale: interactive ? 1 : 0.65,
            rotate: interactive ? 90 : 0,
            opacity: interactive ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 28,
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block rounded-full border border-white/10"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: interactive ? 138 : 112,
          height: interactive ? 138 : 112,
          opacity: visible ? 0.45 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 32,
          mass: 0.5,
        }}
      />
    </>
  );
}

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <CustomCursor />
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/65 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="font-bold tracking-[0.2em]"
          >
            DILLIBOY
          </button>

          <div className="hidden gap-7 md:flex">
            {[
              ['about', 'About'],
              ['music', 'Music'],
              ['work', 'Work'],
              ['live', 'Live'],
              ['genres', 'Genres'],
              ['services', 'Services'],
              ['gallery', 'Gallery'],
              ['contact', 'Contact'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-white"
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="hidden rounded-full border border-white/15 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-all hover:border-white hover:bg-white hover:text-black sm:block"
          >
            Let's Work
          </button>
        </div>
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

        <div className="relative z-10 max-w-6xl text-center">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-zinc-600">
            Music Producer · DJ · Sound Designer
          </p>

          <h1 className="text-[18vw] font-black leading-[0.75] tracking-[-0.025em] md:text-[12rem]">
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

      <section
        id="about"
        className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8"
      >
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
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950">
                <AssetImage
                  src="/about/About.jpeg"
                  alt="Dilliboy"
                  className="aspect-[4/3] w-full object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
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

      <section
        id="music"
        className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8"
      >
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

      <section
        id="work"
        className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8"
      >
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

      <section
        id="experience"
        className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8"
      >
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

      <section
        id="live"
        className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8"
      >
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
              title="Wreckfest.jpg"
              year="2024"
              location="Mumbai, India"
              description="Performed alongside Karan Kanchan, Ritviz, Chaar Diwari, Amin Jazz & more at Wreckfest 2024."
              image="/media/wreckfest.jpg"
              video="https://www.youtube.com/embed/_QSBF4qawEs"
            />

            <PerformanceCard
              title="The Yaksha Show.jpg"
              year="2026"
              location="Delhi, India"
              description="Performed alongside Purab Paschim and IMO Clan at the Prelude to The Yaksha Show in May 2026."
              image="/media/the yaksha show.jpg"
              video="https://www.youtube.com/embed/2IWZtWcsmGQ"
            />
          </div>
        </div>
      </section>

      <section
        id="releases"
        className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8"
      >
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

      <section
        id="genres"
        className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8"
      >
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

      <section
        id="services"
        className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8"
      >
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
                <h3 className="mt-16 text-2xl font-black tracking-tight transition-colors group-hover:text-yellow-400">
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

      <section
        id="gallery"
        className="border-t border-white/5 px-4 py-24 sm:px-6 lg:px-8"
      >
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

      <section
        id="contact"
        className="border-t border-white/5 px-4 py-28 sm:px-6 lg:px-8"
      >
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

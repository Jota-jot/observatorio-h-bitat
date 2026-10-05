import React, { useId } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCard?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showCard = false,
  className = ''
}) => {
  const uid = useId().replace(/:/g, '');
  const leftGradId = `acw-left-${uid}`;
  const rightGradId = `acw-right-${uid}`;
  const swooshGradId = `acw-swoosh-${uid}`;

  const iconClasses =
    size === 'xl'
      ? 'w-20 h-18 sm:w-24 sm:h-20'
      : size === 'lg'
      ? 'w-14 h-12'
      : size === 'sm'
      ? 'w-8 h-7'
      : 'w-11 h-10';

  const subtitleClasses =
    size === 'xl'
      ? 'text-xs sm:text-sm tracking-[0.25em]'
      : size === 'lg'
      ? 'text-[11px] tracking-[0.22em]'
      : size === 'sm'
      ? 'text-[8px] tracking-[0.18em]'
      : 'text-[10px] tracking-[0.21em]';

  const titleClasses =
    size === 'xl'
      ? 'text-3xl sm:text-4xl'
      : size === 'lg'
      ? 'text-2xl sm:text-3xl'
      : size === 'sm'
      ? 'text-base'
      : 'text-xl sm:text-2xl';

  return (
    <div
      className={`inline-flex items-center ${
        size === 'xl' ? 'gap-5' : size === 'lg' ? 'gap-4' : 'gap-3'
      } select-none ${
        showCard
          ? 'bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-xs'
          : ''
      } ${className}`}
    >
      {/* Faithful High-Precision Vector SVG of the AssureCareWare "A" Emblem */}
      <svg
        viewBox="0 0 140 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconClasses} shrink-0`}
        role="img"
        aria-label="Logotipo Hábitat Asistencial AssureCareWare"
      >
        <defs>
          {/* Main 'A' Left & Apex Gradient: Deep Cerulean -> Cyan -> Care Teal */}
          <linearGradient
            id={leftGradId}
            x1="16"
            y1="108"
            x2="92"
            y2="35"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0097DB" />
            <stop offset="45%" stopColor="#0086CC" />
            <stop offset="100%" stopColor="#26B47F" />
          </linearGradient>

          {/* Lower Right Leg Gradient: Teal -> Vibrant Lime Green */}
          <linearGradient
            id={rightGradId}
            x1="84"
            y1="72"
            x2="114"
            y2="108"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#2FB872" />
            <stop offset="100%" stopColor="#8CE026" />
          </linearGradient>

          {/* Ascending Swoosh Crossbar Gradient: Ocean Blue -> Emerald Teal -> Lime */}
          <linearGradient
            id={swooshGradId}
            x1="30"
            y1="108"
            x2="124"
            y2="68"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0088CE" />
            <stop offset="48%" stopColor="#1DB380" />
            <stop offset="100%" stopColor="#7ED321" />
          </linearGradient>
        </defs>

        {/* Left leg, rounded apex, and upper-right leg above the swoosh */}
        <path
          d="M15 99 L56 17 C60.5 8 71.5 8 76 17 L92 49 C86.5 48.5 80 49.5 74.5 51.5 L66 34.5 L30 105 C27 110.5 19.5 110.5 16 105.5 C13.5 102.5 13.8 101.2 15 99 Z"
          fill={`url(#${leftGradId})`}
        />

        {/* Lower-right leg segment emerging beneath the swoosh */}
        <path
          d="M87 79 C93.5 79.2 99.5 80.5 104.5 82.5 L114 100.5 C116.8 106 112.5 111.5 106.5 110.8 C102.5 110.3 99.5 107.8 97 103 L87 79 Z"
          fill={`url(#${rightGradId})`}
        />

        {/* Dynamic ascending care swoosh crossbar */}
        <path
          d="M32 108 C52 75 88 53 114 60 C121.5 62 126.5 68 129 76 C106 65.5 72 70 32 108 Z"
          fill={`url(#${swooshGradId})`}
        />
      </svg>

      {/* Brand Lockup Typography */}
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`${subtitleClasses} font-bold uppercase text-[#0A1D37] block`}
        >
          HÁBITAT ASISTENCIAL
        </span>
        <span
          className={`${titleClasses} font-extrabold tracking-tight text-[#0A1D37] block mt-1`}
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          AssureCareWare
        </span>
      </div>
    </div>
  );
};

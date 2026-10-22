const BRAND_RED = "#E2231F";

/**
 * Solid Equipment Ltd — brand mark (red diamond + calligraphic S).
 * Compact version for the sticky header and small placements.
 */
export function SelMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M50 3 L97 48 L50 97 L3 48 Z" fill={BRAND_RED} />
      <path
        d="M 66 30 C 54 19, 32 25, 30 39 C 28 51, 41 57, 52 57 C 63 57, 69 46, 62 40 C 55 34, 43 38, 38 45 C 30 56, 35 75, 51 78 C 65 81, 75 71, 71 59"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Full circular company badge:
 * white disc, red diamond monogram, SEL wordmark and RC number,
 * with "Solid EQUIPMENT LTD" curved along the bottom edge.
 */
export function SelBadge({ className = "h-24 w-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-label="Solid Equipment Ltd logo">
      <circle cx="100" cy="100" r="96" fill="#FFFFFF" stroke="#AEB6BE" strokeWidth="3" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#DDE1E5" strokeWidth="1" />

      {/* Diamond monogram */}
      <path d="M100 30 L147 76 L100 122 L53 76 Z" fill={BRAND_RED} />
      <path
        d="M 120 58 C 111 49, 94 54, 92 65 C 90 75, 100 80, 109 80 C 118 80, 123 71, 117 66 C 112 61, 103 64, 99 70 C 93 79, 97 94, 110 97 C 121 99, 129 91, 126 81"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* SEL wordmark */}
      <text
        x="100"
        y="146"
        textAnchor="middle"
        fontFamily="Montserrat, Inter, sans-serif"
        fontWeight="800"
        fontSize="21"
        letterSpacing="4"
        fill="#14161A"
      >
        SEL
      </text>
      <rect x="74" y="152" width="52" height="3.5" fill={BRAND_RED} />

      {/* RC number */}
      <text
        x="112"
        y="134"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        fontSize="9"
        fill="#3A3F45"
      >
        RC: 843928
      </text>

      {/* Curved company name */}
      <path
        id="sel-badge-arc"
        d="M 20 106 A 80 80 0 0 0 180 106"
        fill="none"
      />
      <text
        fontFamily="Montserrat, Inter, sans-serif"
        fontWeight="700"
        fontSize="17.5"
        fill="#14161A"
        letterSpacing="0.5"
      >
        <textPath href="#sel-badge-arc" startOffset="50%" textAnchor="middle">
          <tspan fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontWeight="700">
            Solid
          </tspan>
          {" EQUIPMENT LTD"}
        </textPath>
      </text>
    </svg>
  );
}

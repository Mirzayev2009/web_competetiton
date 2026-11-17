export function HeroDrill() {
  return <svg className="hero-drill" viewBox="0 0 800 480" fill="none" aria-hidden="true">
    <path d="M40 66h108v350H40z" fill="#c9cdc1" />
    <path d="M148 66v350M62 109h62M62 371h62M78 151h40M72 330h49" stroke="#9ea99d" strokeWidth="5" />
    <path d="M40 66h108v350H40z" stroke="#2c3933" strokeWidth="6" />
    <ellipse className="drill-hole" cx="146" cy="242" rx="9" ry="13" fill="#59685d" />
    <g className="drill-impact" stroke="#a7472e" strokeWidth="3" strokeLinecap="round">
      <path d="M129 224c-10 12-10 24 0 36M119 217c-17 18-17 34 0 51" />
    </g>
    <g className="drill-dust-a" stroke="#a7472e" strokeWidth="5" strokeLinecap="round">
      <path d="M133 221l-14-13M130 260l-17 10M138 207l-4-16" />
    </g>
    <g className="drill-dust-b" stroke="#8a978a" strokeWidth="4" strokeLinecap="round">
      <path d="M128 233l-18-5M130 251l-19 7M136 275l-8 14" />
      <circle cx="107" cy="240" r="4" fill="#a7472e" stroke="none" />
    </g>
    <g className="drill-assembly" stroke="#1e2925" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round">
      <path d="M234 197h110v77H234z" fill="#aeb8ad" />
      <path d="M202 220h32v31h-32z" fill="#1e2925" />
      <path d="M171 232h31" />
      <g className="drill-flute" stroke="#66756a" strokeWidth="5">
        <path d="M177 226l13 12M177 239l13 12M192 226l9 9" />
      </g>
      <g className="drill-spin" stroke="#bd623f" strokeWidth="3" strokeLinecap="round">
        <path d="M191 215c-11 8-11 41 0 50M202 215c10 8 10 41 0 50" />
      </g>
      <path d="M344 177h240c29 0 54 22 54 51v16c0 30-25 54-54 54H344z" fill="#28352f" />
      <path d="M364 177h192v34H364z" fill="#aeb8ad" stroke="none" />
      <path d="M428 297h103l-13 98h-75z" fill="#28352f" />
      <path d="M442 389h91l15 24H429z" fill="#28352f" />
      <path d="M426 299h37l-8 25h-19z" fill="#bd623f" />
      <path d="M376 239h138" stroke="#bd623f" strokeWidth="13" />
      <circle cx="575" cy="258" r="12" fill="#bd623f" stroke="none" />
      <path d="M464 347h45M465 364h42" stroke="#839187" strokeWidth="5" />
      <path d="M262 209v53M284 209v53M306 209v53" stroke="#66756a" strokeWidth="5" />
    </g>
    <path d="M42 419h720" stroke="#bac1b4" strokeWidth="4" />
    <path d="M59 427h103M650 427h72" stroke="#a7472e" strokeWidth="5" />
  </svg>;
}

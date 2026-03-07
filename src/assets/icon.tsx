import morbiusImage from "./morbius.png";

export const Icon = () => (
  <svg width="612" viewBox="0 0 612 608" fill="none">
    <mask id="mask0_0_1" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="77" width="612" height="531">
      <path d="M0 77H612V461C612 461 612 608 306 608C0 608 0 461 0 461V77Z" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_0_1)">
      <rect y="46" width="612" height="618" fill="url(#pattern0_0_1)" />
    </g>
    <path
      d="M319.917 0.0248245C293.836 -0.725338 245 15.38 245 68.2547L325.25 32.6169C325.25 32.6169 353.75 29.9919 348.232 22.1404C342.017 13.2965 319.917 15.3928 319.917 15.3928C319.917 15.3928 335.75 0.48025 319.917 0.0248245Z"
      fill="#00BBFF"
    />
    <path
      d="M245 69.75C245 49.0393 261.789 32.25 282.5 32.25H329.75C350.461 32.25 367.25 49.0393 367.25 69.75V162C367.25 182.711 350.461 199.5 329.75 199.5H282.5C261.789 199.5 245 182.711 245 162V69.75Z"
      fill="#00BBFF"
    />
    <rect width="39" height="60" rx="19.5" transform="matrix(-1 0 0 1 296.75 82.5)" fill="white" />
    <rect width="39" height="60" rx="19.5" transform="matrix(-1 0 0 1 353.75 82.5)" fill="white" />
    <rect width="27.75" height="39.75" rx="13.875" transform="matrix(-1 0 0 1 290.75 92.25)" fill="#333333" />
    <rect width="27.75" height="39.75" rx="13.875" transform="matrix(-1 0 0 1 347.75 93)" fill="#333333" />
    <rect width="12.75" height="14.25" rx="6.375" transform="matrix(-1 0 0 1 335.75 93)" fill="white" />
    <rect width="12.75" height="14.25" rx="6.375" transform="matrix(-1 0 0 1 277.25 93)" fill="white" />
    <path
      d="M337.625 156.75C306.5 171.666 275 156.75 275 156.75"
      stroke="#DF6800"
      strokeWidth="15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M261.5 151.085C261.5 151.085 306.666 141.376 349.25 151.084C306.5 147.751 261.5 151.085 261.5 151.085Z"
      stroke="#FA8900"
      strokeWidth="15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M305.75 120.75C288.5 120.751 302.375 137.249 262.625 143.624C262.625 158.624 350.375 162.749 350.375 143.624C311.375 139.124 324.5 120.749 305.75 120.75Z"
      fill="#FA8900"
    />
    <defs>
      <pattern id="pattern0_0_1" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use href="#image0_0_1" transform="matrix(0.00197628 0 0 0.00195538 -0.743083 -0.263976)" />
      </pattern>
      <image id="image0_0_1" width="1280" height="864" preserveAspectRatio="none" href={morbiusImage} />
    </defs>
  </svg>
);

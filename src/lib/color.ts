/**
 * Color and Contrast Utility for Dynamic Multi-Tenant Theming
 * Ensures WCAG 2.1 AA/AAA compliance when administrators select dynamic colors.
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Converts a hex color string to RGB object.
 */
function hexToRgb(hex: string): RGB | null {
  let cleaned = hex.trim().replace(/^#/, '');

  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }

  if (cleaned.length !== 6) {
    return null;
  }

  const num = parseInt(cleaned, 16);
  if (isNaN(num)) return null;

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Parses RGB / RGBA strings like "rgb(34, 51, 84)" or "rgba(34, 51, 84, 1)"
 */
function parseRgbString(color: string): RGB | null {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return null;
  return {
    r: Math.min(255, Math.max(0, parseInt(match[1], 10))),
    g: Math.min(255, Math.max(0, parseInt(match[2], 10))),
    b: Math.min(255, Math.max(0, parseInt(match[3], 10))),
  };
}

/**
 * Parses HSL string like "hsl(215, 42%, 23%)"
 */
function parseHslString(color: string): RGB | null {
  const match = color.match(/hsla?\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)%?,\s*(\d+(?:\.\d+)?)%?/i);
  if (!match) return null;

  const h = parseFloat(match[1]) / 360;
  const s = parseFloat(match[2]) / 100;
  const l = parseFloat(match[3]) / 100;

  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tNorm = t;
    if (tNorm < 0) tNorm += 1;
    if (tNorm > 1) tNorm -= 1;
    if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
    if (tNorm < 1 / 2) return q;
    if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

/**
 * Parses OKLCH string like "oklch(0.7 0.17 160)" and approximates luminance directly.
 */
function parseOklchLuminance(color: string): number | null {
  const match = color.match(/oklch\(\s*(\d+(?:\.\d+)?%?)/i);
  if (!match) return null;
  const rawL = match[1];
  const l = rawL.endsWith('%') ? parseFloat(rawL) / 100 : parseFloat(rawL);
  // In OKLCH, L is perceived lightness in [0, 1].
  // Values > 0.65 are light backgrounds; <= 0.65 are dark.
  return isNaN(l) ? null : l;
}

/**
 * Calculates standard WCAG 2.1 relative luminance for an sRGB color.
 */
function getRelativeLuminance(rgb: RGB): number {
  const sRGB = [rgb.r, rgb.g, rgb.b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Determines whether a color is "light" or "dark".
 * Returns true if the background is light (requiring dark text).
 * Returns false if the background is dark (requiring white text).
 */
export function isLightColor(color?: string | null): boolean {
  if (!color || typeof color !== 'string') return false;

  const trimmed = color.trim().toLowerCase();

  // Handle OKLCH directly
  const oklchL = parseOklchLuminance(trimmed);
  if (oklchL !== null) {
    return oklchL > 0.62;
  }

  // Handle Hex
  const rgb = hexToRgb(trimmed) || parseRgbString(trimmed) || parseHslString(trimmed);
  if (!rgb) {
    // Default safe fallback: assume dark if unknown
    return false;
  }

  const luminance = getRelativeLuminance(rgb);
  // WCAG recommended threshold: >= 0.45 is light, < 0.45 is dark
  return luminance >= 0.42;
}

/**
 * Returns a high-contrast foreground color (text color) for any dynamic background color.
 * Light backgrounds get dark text (#0f172a / deep slate).
 * Dark backgrounds get white text (#ffffff).
 */
export function getContrastForeground(bgColor?: string | null): string {
  return isLightColor(bgColor) ? '#0f172a' : '#ffffff';
}

/**
 * Returns a high-contrast muted text color for subtle labels on the dynamic color.
 */
export function getContrastMutedForeground(bgColor?: string | null): string {
  return isLightColor(bgColor) ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.8)';
}

/**
 * Generates dynamic CSS variables string for HTML <style> tag injection.
 * Solves same bg & text color issues across both Light and Dark modes.
 */
export function generateDynamicThemeCss(
  primaryColor?: string | null,
  secondaryColor?: string | null
): string {
  const primary = primaryColor?.trim() || '#10b981';
  const secondary = secondaryColor?.trim() || '#6366f1';

  const primaryFg = getContrastForeground(primary);
  const secondaryFg = getContrastForeground(secondary);

  const primaryMutedFg = getContrastMutedForeground(primary);
  const secondaryMutedFg = getContrastMutedForeground(secondary);

  const primaryBorder = isLightColor(primary) ? 'rgba(15, 23, 42, 0.25)' : 'rgba(255, 255, 255, 0.3)';
  const secondaryBorder = isLightColor(secondary) ? 'rgba(15, 23, 42, 0.25)' : 'rgba(255, 255, 255, 0.3)';

  return `
    :root, .dark {
      --primary: ${primary};
      --primary-foreground: ${primaryFg};
      --primary-muted-foreground: ${primaryMutedFg};
      --primary-border: ${primaryBorder};
      --secondary: ${secondary};
      --secondary-foreground: ${secondaryFg};
      --secondary-muted-foreground: ${secondaryMutedFg};
      --secondary-border: ${secondaryBorder};
    }
  `.trim();
}

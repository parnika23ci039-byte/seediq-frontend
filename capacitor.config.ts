import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.seediq.app",
  appName: "SeedIQ",
  // Capacitor copies this folder's built assets into the native app.
  // Your TanStack Start build output currently lands in .output/public
  // (same folder Vercel serves from — see vercel.json).
  webDir: ".output/public",

  // --- OPTION A (default): fully bundled, works offline for static parts ---
  // Uses the files in webDir above. Good once your routes can prerender.

  // --- OPTION B: point at your live hosted site instead of bundling files ---
  // Simpler to get working first, but requires an internet connection to
  // open the app at all. Uncomment to use it:
  // server: {
  //   url: "https://your-frontend.vercel.app",
  //   cleartext: false,
  // },
};

export default config;

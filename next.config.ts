import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the dev-only overlay badge so it doesn't obscure bottom-left hero UI.
  devIndicators: false,
  images: {
    // Allow the higher-fidelity quality used by the hero product shots.
    qualities: [75, 90],
  },
};

export default nextConfig;

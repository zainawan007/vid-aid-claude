import { loadFont as loadBebas } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

export const bebas = loadBebas("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
export const inter = loadInter("normal", { weights: ["500", "800"], subsets: ["latin"] }).fontFamily;

export const C = {
  bg: "#0A0A0F",
  pink: "#FF2D6F",
  cyan: "#00E5FF",
  cream: "#FFF4E8",
  ink: "#0A0A0F",
};

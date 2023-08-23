// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  presetWebFonts,
  presetIcons,
} from "unocss";

type WebFontsProviders = "google" | "bunny" | "fontshare" | "none";
interface WebFontMeta {
  name: string;
  weights?: (string | number)[];
  italic?: boolean;
  /**
   * Override the provider
   * @default <matches root config>
   */
  provider?: WebFontsProviders;
}

//in here we may define brand themes to scale large applications
export default defineConfig({
  presets: [
    presetIcons({}),
    presetAttributify(), // required when using attributify mode
    presetUno(), // required
    presetTypography(),
    presetWebFonts({
      fonts: {
        inter: "Inter",

        melodrama: [
          {
            name: "Melodrama",

            provider: "fontshare",
          },
        ],
      },
    }),
  ],
  theme: {
    colors: {
      brand: {
        "100": "#ffffff",
      },
      brandsec: {
        "100": "#000000",
      },
    },
  },
  shortcuts: {
    //buttons
    btnbrand:
      "cursor-pointer border py-2 px-6  rounded-full hover:border-blue transition delay-50 duration-700 focus:scale-95 focus:border-black  focus:shadow-none",
    btnsec:
      "cursor-pointer border py-2 px-6 rounded-full hover:border-blue transition delay-50 duration-700 focus:scale-95 focus:border-black  focus:shadow-none",
  },
});

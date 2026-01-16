declare module '*.svg' {
  /**
   * A path to the SVG file
   */
  const path: `${string}.svg`;
  export = path;
}

declare module '*.module.css' {
  /**
   * A record of class names to their corresponding CSS module classes
   */
  const classes: { readonly [key: string]: string };
  export = classes;
}

// Must align with `.env` file.
declare module 'bun' {
  interface Env {
    /**
     * Base name of API provider.
     * @default "https://example.com/"
     */
    BUN_PUBLIC_API_HOST: string;

    /**
     * Will use mocks in dev mode when "1" or "true".
     * @default "1"
     */
    BUN_PUBLIC_ENABLE_MOCKS: string;
  }
}

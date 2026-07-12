/** Shared scroll timing for the OurClients → AboutUs curtain transition.
 *
 *  All progress values are 0→1 through the AboutUs scroll track
 *  (start start → end end). Edit CLIENT_FADE_START / CLIENT_FADE_END
 *  directly to control when OurClients content fades out. */

/** Total scroll track height for the AboutUs pinned section (vh). */
export const ABOUT_SCROLL_VH = 150;

/** Scroll progress where the curtain shape fully closes. */
export const SHAPE_CLOSED_AT = 0.2;

/** Scroll progress where OurClients content begins fading out. */
export const CLIENT_FADE_START = 0.1;

/** Scroll progress where OurClients content is fully faded out. */
export const CLIENT_FADE_END = 0.15;

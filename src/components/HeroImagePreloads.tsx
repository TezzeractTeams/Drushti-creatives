/** Early `<link rel="preload">` hints for viewport-visible hero images. */
export function HeroImagePreloads({ srcs }: { srcs: string[] }) {
  return (
    <>
      {srcs.map((src) => (
        <link key={src} rel="preload" as="image" href={src} />
      ))}
    </>
  );
}

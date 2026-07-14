import clsx from "clsx";

/** Wide hollow pill that replaces the "O" in hero headlines. */
export function ExtendedLetterO({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={clsx(
        "relative box-border inline-block shrink-0 rounded-pill border-[0.216em] border-white bg-transparent align-baseline",
        className,
      )}
      style={{
        width: "2.1em",
        height: "0.75cap",
      }}
    />
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand-950">
        We could not find that page
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        The link may be out of date. Try our treatments list, or call the clinic and we will
        point you in the right direction.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-brand-700 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          Back to home
        </Link>
        <Link
          href="/services"
          className="rounded-full border border-brand-200 bg-surface px-7 py-3.5 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-400"
        >
          View treatments
        </Link>
      </div>
    </section>
  );
}

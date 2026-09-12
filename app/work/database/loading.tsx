export default function DatabaseLoading() {
  return (
    <div className="px-6 sm:px-8 lg:px-12 py-20" aria-busy="true">
      <div className="max-w-[1400px] mx-auto">
        <div className="h-10 w-2/3 rounded-xl bg-muted animate-pulse" />
        <div className="mt-4 h-5 w-1/2 rounded-lg bg-muted animate-pulse" />
        <div className="mt-10 aspect-[16/9] rounded-2xl border border-border bg-muted/40 animate-pulse" />
      </div>
    </div>
  );
}

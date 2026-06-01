"use client";

// Real clips from /public/videos — captured moments of DTC distributing its
// printed briefs and engaging delegates at the UN, not staged productions.
const videos = [
  { src: "/videos/outreach-1.mp4", label: "Putting the brief in their hands" },
  { src: "/videos/IMG_3402.mp4", label: "Reaching delegations on the floor" },
  { src: "/videos/IMG_3403.mp4", label: "Conversations between sessions" },
  { src: "/videos/IMG_3407.mp4", label: "Making the case in person" },
];

export function OutreachVideos() {
  return (
    <section className="w-full py-16 px-6 sm:px-8 lg:px-12 bg-white dark:bg-neutral-950">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
          In Motion
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-3">
          Out in the world.
        </h2>
        <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed mb-12">
          Policy research is only as good as the conversations it starts. A few
          captured moments from DTC out in the field.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map((video, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 aspect-[9/16]"
            >
              <video
                src={video.src}
                controls
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
              <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-sm font-medium text-white bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                {video.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

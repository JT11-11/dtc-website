"use client";

const photos = [
  {
    src: "/images/un/ga-hall.jpg",
    alt: "A DTC member inside the United Nations General Assembly Hall in New York",
  },
  {
    src: "/images/un/hlpf.jpg",
    alt: "DTC at the High-Level Political Forum on Sustainable Development (ECOSOC), Conference Room 4, UN Headquarters",
  },
  {
    src: "/images/un/official-meeting.jpg",
    alt: "DTC members speaking with a UN official at the United Nations in New York",
  },
  {
    src: "/images/un/flag-portrait.jpg",
    alt: "A DTC member beside the UN flag and emblem at the United Nations",
  },
  {
    src: "/images/un/sdg-exhibit.jpg",
    alt: "The 17 Sustainable Development Goals on display at the United Nations",
  },
  {
    src: "/images/un/unga.jpg",
    alt: "DTC members at the #UNGA sign at United Nations Headquarters",
  },
  {
    src: "/images/un/sdg-water.jpg",
    alt: "A DTC member with the SDG 14 'Life Below Water' goal at the UN",
  },
  {
    src: "/images/un/window.jpg",
    alt: "Looking out over the UN grounds and the New York skyline from inside the building",
  },
];

export function AboutField() {
  return (
    <section className="w-full py-16 px-6 sm:px-8 lg:px-12 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
          Beyond the Lab
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-3">
          We show up in person.
        </h2>
        <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed mb-12">
          Research lives in documents, but change happens in rooms. Here is what
          it looks like when the DTC team shows up at the table.
        </p>

        <div className="columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-neutral-400 dark:text-neutral-600">
          DTC at the United Nations, New York — engaging across the IGF,
          ECOSOC/HLPF, WSIS+20 and UNGA events, and the 17 Sustainable
          Development Goals (2025).
        </p>
      </div>
    </section>
  );
}

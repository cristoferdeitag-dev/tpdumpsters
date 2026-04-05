import Image from "next/image";

const defaultPhotos = [
  { src: "/images/dumpsters/delivery-residential.jpg", alt: "Dumpster delivery to residential home" },
  { src: "/images/dumpsters/truck-dumping.jpg", alt: "Dumpster truck delivering roll-off container" },
  { src: "/images/dumpsters/dumpster-dirt-sunny.jpg", alt: "Loaded dumpster ready for pickup" },
  { src: "/images/dumpsters/delivery-suburban.jpg", alt: "Dumpster rental in suburban neighborhood" },
];

interface PhotoItem {
  src: string;
  alt: string;
}

export default function DumpsterPhotosGrid({ photos }: { photos?: PhotoItem[] } = {}) {
  return (
    <section className="py-10 bg-white">
      <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(photos || defaultPhotos).map((photo) => (
            <div key={photo.src} className="overflow-hidden rounded-lg">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={300}
                height={200}
                className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

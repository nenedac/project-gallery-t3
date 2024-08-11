import Link from "next/link";

const mockUrls = [
  "https://utfs.io/f/3dcd7533-b49e-4dc3-9012-ddbfb6de5d2e-3dcaim.jpg",
  "https://utfs.io/f/3dcd7533-b49e-4dc3-9012-ddbfb6de5d2e-3dcaim.jpg",
  "https://utfs.io/f/3dcd7533-b49e-4dc3-9012-ddbfb6de5d2e-3dcaim.jpg",
  "https://utfs.io/f/3dcd7533-b49e-4dc3-9012-ddbfb6de5d2e-3dcaim.jpg",
  "https://utfs.io/f/3dcd7533-b49e-4dc3-9012-ddbfb6de5d2e-3dcaim.jpg",
  "https://utfs.io/f/3dcd7533-b49e-4dc3-9012-ddbfb6de5d2e-3dcaim.jpg",

];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
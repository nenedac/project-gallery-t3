import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

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

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
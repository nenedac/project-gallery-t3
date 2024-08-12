import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="flex flex-col">
          <img
            src={image.url}
            alt={image.name}
            className="w-auto h-full object-contain"
          />
          <div className="text-center mt-2"> {/* Center text and add margin */}
            {image.name.length > 24
              ? `${image.name.slice(0, 24)}~${image.name.slice(-4)}`
              : image.name}
          </div>
        </div>
      ))}
    </div>
  );
}



export default async function HomePage() {

  return (
    <main className="">

      <SignedOut>
        <div className="h-full w-full text-2xl text-center">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>

    </main>
  );
}
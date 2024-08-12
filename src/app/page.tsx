import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {

  const Images = await getMyImages();

  return (
    <main className="">
      <div className="flex flex-wrap justify-center gap-5">
        {Images.map((image) => (
          <div key={image.id} className="flex flex-col items-center w-48 h-40 mb-14">
            <div className=" w-full h-full ">
              <Image
                src={image.url}
                alt={image.name}
                width={192} // Set width
                height={160} // Set height
                style={{ objectFit: 'cover' }} // 'cover' to maintain aspect ratio and fill container
                className="w-full h-full" // Ensure the image covers the container
              />
              <div className="mt-2 text-center">
                {image.name.length > 18
                  ? `${image.name.slice(0, 18)}`
                  : image.name}
              </div>
            </div>

          </div>
        ))}
      </div>
    </main>
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
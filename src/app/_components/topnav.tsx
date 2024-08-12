import { SimpleUploadButton } from "./simple-upload-button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function TopNav() {

  return (
    <nav className="flex w-full items-center justify-between border-b 
    p-4 text-xl font-semibold ">
      <div>Catllery</div>

      <div className="flex flew-row gap-4 items-center">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
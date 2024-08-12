"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.routeConfig?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

function UploadSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  );
}

function LoadingSpinnerSVG() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      <circle className="spinner_1KD7" cx="12" cy="3" r="0" />
      <circle className="spinner_1KD7 spinner_MJg4" cx="16.50" cy="4.21" r="0" />
      <circle className="spinner_1KD7 spinner_SeO7" cx="7.50" cy="4.21" r="0" />
      <circle className="spinner_1KD7 spinner_sj9X" cx="19.79" cy="7.50" r="0" />
      <circle className="spinner_1KD7 spinner_7he2" cx="4.21" cy="7.50" r="0" />
      <circle className="spinner_1KD7 spinner_WwCl" cx="21.00" cy="12.00" r="0" />
      <circle className="spinner_1KD7 spinner_4zOl" cx="3.00" cy="12.00" r="0" />
      <circle className="spinner_1KD7 spinner_vy2J" cx="19.79" cy="16.50" r="0" />
      <circle className="spinner_1KD7 spinner_kugV" cx="4.21" cy="16.50" r="0" />
      <circle className="spinner_1KD7 spinner_os1F" cx="16.50" cy="19.79" r="0" />
      <circle className="spinner_1KD7 spinner_WNEg" cx="7.50" cy="19.79" r="0" />
      <circle className="spinner_1KD7 spinner_l1Tw" cx="12" cy="21" r="0" />
    </svg>

  );
}


export function SimpleUploadButton() {
  const router = useRouter();

  const posthog = usePostHog();
  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      posthog.capture("upload_begin");
      toast(
        <div className="flex gap-2 text-white items-center">
          <LoadingSpinnerSVG /> <span className="text-lg">Uploading...</span>
        </div>, {
        duration: 100000,
        id: "upload-begin"
      });
    },
    onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast("Upload complete!");

      router.refresh();
    },
  });

  return (
    <div>
      <label htmlFor="upload-button" className="cursor-pointer">
        <UploadSVG />
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}

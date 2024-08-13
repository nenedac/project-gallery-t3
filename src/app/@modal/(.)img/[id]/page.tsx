import { Modal } from "./modal";
import { FullPageImageView } from "~/common/full-image-page";

export default async function PhotoModal({
 params: { id: photoId },
}: {
 params: { id: string; };
}) {
 return (
  <Modal>
   <FullPageImageView photoId={photoId} />
  </Modal>
 );
}
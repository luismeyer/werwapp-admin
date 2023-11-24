import { FileRouter } from "@/app/api/image-upload";
import { PlayerRoleDef } from "@/app/api/roles";
import { generateComponents } from "@uploadthing/react";
import Image from "next/image";

const { UploadButton } = generateComponents<FileRouter>({ url: "/api/image" });

type ImageUploadProps = {
  onUploadSuccess: (url: string) => void;
  role: PlayerRoleDef;
  index: number;
};

export function ImageUpload({
  onUploadSuccess,
  role,
  index,
}: ImageUploadProps) {
  return (
    <>
      <UploadButton
        appearance={{
          allowedContent: { display: "none" },
          button: {
            accentColor: "black",
            backgroundColor: "white",
            color: "black",
            width: "100%",
            borderRadius: "0",
          },
        }}
        content={{ button: () => <>Upload image</> }}
        endpoint="imageUploader"
        onClientUploadComplete={([res]) => onUploadSuccess(res.url)}
      />

      <Image
        priority={index <= 5}
        draggable={false}
        alt={`image of ${role.name}`}
        src={role.image}
        width={300}
        height={300}
      />
    </>
  );
}

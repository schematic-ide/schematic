import { MediaFrame } from "@/components/MediaFrame";

type Props = {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
};

export function ContentImage({ src, alt, title = "image preview", caption }: Props) {
  return (
    <MediaFrame title={title} tag="image" caption={caption}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="aspect-video w-full object-cover"
      />
    </MediaFrame>
  );
}

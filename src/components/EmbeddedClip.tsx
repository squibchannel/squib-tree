import React from "react";

interface EmbeddedClipProps {
  height: string;
  width: string;
  embed_url: string;
  autoplay?: boolean;
  muted?: boolean;
}

export default function EmbeddedClip({
  height,
  width,
  embed_url,
  autoplay = false,
  muted = false,
}: EmbeddedClipProps) {
  // Get the current hostname
  //   const hostname = window.location.hostname;

  // Ensure the parent parameter is set to the current hostname
  const src = `${embed_url}&parent=localhost&autoplay=${autoplay}&muted=${muted}`;

  return (
    <iframe
      src={src}
      height={height}
      width={width}
      allowFullScreen
      title="Twitch Clip"
    ></iframe>
  );
}

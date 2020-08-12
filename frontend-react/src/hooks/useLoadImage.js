import { useEffect, useState } from "react";

export default function useLoadImage (src) {
  const [ sourceLoaded, setSourceLoaded ] = useState(null)

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
    return () => img.onload = null; // unsubscribe from image load
  }, [ src ]);

  return sourceLoaded;
}
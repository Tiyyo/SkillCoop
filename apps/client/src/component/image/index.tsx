import { SyntheticEvent } from 'react';

type ImageWithFallbackProps = {
  url: string | null;
  alt: string;
  className?: string;
};

function ImageWithFallback({ url, alt, className }: ImageWithFallbackProps) {
  const fallbackRandomUrl = 'https://api.dicebear.com/7.x/personas/svg/';
  const defaultPLayer = '/images/default-player.png';

  const onError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    if (img.src === url) {
      img.src = fallbackRandomUrl;
    } else if (img.src === fallbackRandomUrl) {
      img.src = defaultPLayer;
    }
  };
  return (
    <img
      src={url ?? fallbackRandomUrl}
      alt={alt}
      className={className}
      onError={onError}
    />
  );
}

export default ImageWithFallback;

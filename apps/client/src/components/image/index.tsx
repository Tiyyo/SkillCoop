import { SyntheticEvent } from 'react';

type ImageWithFallbackProps = {
  url: string | null;
  alt: string;
  className?: string;
  size?: number;
};

function ImageWithFallback({
  url,
  alt,
  className,
  size,
}: ImageWithFallbackProps) {
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
      style={
        size
          ? { height: `${size}px`, width: `${size}px` }
          : { height: '100%', width: '100%' }
      }
      className={className}
      onError={onError}
    />
  );
}

export default ImageWithFallback;

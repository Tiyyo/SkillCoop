import Spinner from '../loading';

function LoadingPageNavFree() {
  return (
    <div
      className="relative flex min-h-screen-mobile flex-col overflow-hidden 
      lg:min-h-screen lg:flex-row"
    >
      <Spinner />
    </div>
  );
}

export default LoadingPageNavFree;

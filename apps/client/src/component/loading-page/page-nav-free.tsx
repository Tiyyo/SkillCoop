import Spinner from '../loading';

function LoadingPageNavFree() {
  return (
    <div
      className="relative flex flex-col lg:flex-row overflow-hidden 
      min-h-screen-mobile lg:min-h-screen"
    >
      <Spinner />
    </div>
  );
}

export default LoadingPageNavFree;

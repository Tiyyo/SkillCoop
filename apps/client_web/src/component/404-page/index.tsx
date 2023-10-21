import { Link } from 'react-router-dom';

function Page404() {
  return (
    <section className="flex items-center p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl">
            <span className="sr-only">Error</span>
            <span className="text-primary-1000">4</span>
            <span className="text-primary-500">0</span>
            <span className="text-primary-1000">4</span>
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-primary-1100">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 font-medium text-light">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            className="px-8 py-3 font-semibold cursor-pointer text-primary-900"
            to="/">
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Page404;

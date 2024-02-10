import { useEffect, useState } from 'react';

function useResetError(error: boolean | undefined) {
  const [hasError, setHasError] = useState<boolean>();

  useEffect(() => {
    setHasError(error);
  }, [error]);

  return { hasError, setHasError };
}

export default useResetError;

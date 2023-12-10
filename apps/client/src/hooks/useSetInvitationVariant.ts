import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { InvitationPageVariant } from '../types/index';

export const useSetInvitationVariant = () => {
  const [variant, setVariant] = useState<InvitationPageVariant | undefined>(
    undefined,
  );
  const location = useLocation();
  // const variantToDisplay: InvitationPageVariant | undefined =
  //   location.state?.variant;

  useEffect(() => {
    setVariant(location.state?.variant);
  }, []);
  return { variant };
};

import { useLocation } from 'react-router-dom';
import Invite from '../../../component/invite/index';
import { useEffect, useState } from 'react';

function InvitationEvent() {
  const [variant, setVariant] = useState<'update' | 'mutate' | undefined>(
    undefined
  );
  const location = useLocation();
  const variantToDisplay: 'update' | 'mutate' | undefined =
    location.state?.variant;

  useEffect(() => {
    setVariant(variantToDisplay);
  }, []);

  console.log('Which variant it is : ', variant);

  return <Invite variant={variant ? variant : 'update'} />;
}

export default InvitationEvent;

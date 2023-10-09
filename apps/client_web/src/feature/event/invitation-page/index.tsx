import { useLocation } from 'react-router-dom';
import Invite from '../../../component/invite/index';

function InvitationEvent() {
  const location = useLocation();
  const variant: 'update' | 'mutate' | undefined = location.state?.variant;

  return <Invite variant={variant ? variant : 'update'} />;
}

export default InvitationEvent;

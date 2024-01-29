import React from 'react';
import { Link } from 'react-router-dom';

function ConversationCardLink({ children }: { children: React.ReactNode }) {
  return (
    <Link className="lg:hidden" to="rien">
      {children}
    </Link>
  );
}

export default ConversationCardLink;

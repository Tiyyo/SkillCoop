import { useState } from 'react';

function usePasswordMeter() {
  const [currentPassword, setPassword] = useState('');
  const trackPasswordChangeValue = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const passwordInput = form.elements.namedItem(
      'password',
    ) as HTMLInputElement;
    setPassword(passwordInput.value);
  };

  return { currentPassword, trackPasswordChangeValue };
}

export default usePasswordMeter;

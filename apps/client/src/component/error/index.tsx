function ErrorContainer({ errorValue }: { errorValue: string | undefined }) {
  function displayErrorMessage(errorValue: string | undefined): string {
    if (!errorValue) return '';
    if (errorValue.includes('Email not verified')) {
      return 'Please verify your email !';
    }
    if (errorValue.includes('Email already exist')) {
      return 'Email already exist !';
    }
    if (
      errorValue.includes('Password') ||
      errorValue.includes("Can't find any user")
    ) {
      return 'Bad crendentials !';
    }
    return errorValue;
  }

  return (
    <p className="text-error text-xs font-semibold">
      {displayErrorMessage(errorValue)}
    </p>
  );
}

export default ErrorContainer;

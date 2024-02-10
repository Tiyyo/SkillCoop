function NotFoundMessage({ message }: { message: string }) {
  return (
    <p className="py-20 text-center text-xs italic text-light">{message}</p>
  );
}

export default NotFoundMessage;

function ConversationCardLastMessage({ content }: { content: string }) {
  return (
    <span
      className="text-xs overflow-hidden
           max-h-9 text-ellipsis line-clamp-2"
    >
      {content}
    </span>
  );
}

export default ConversationCardLastMessage;

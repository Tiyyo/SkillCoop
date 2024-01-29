function ConversationCardLastMessage({ content }: { content: string }) {
  return (
    <span
      className="line-clamp-2 max-h-9
           overflow-hidden text-ellipsis break-words text-xs"
    >
      {content}
    </span>
  );
}

export default ConversationCardLastMessage;

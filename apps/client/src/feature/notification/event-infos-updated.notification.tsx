export type EventInfosUpdatedNotificationProps = {
  id: number;
  message: string;
};

function EventInfosUpdatedNotification({
  id,
  message,
}: EventInfosUpdatedNotificationProps) {
  return (
    <div key={id} className="relative py-3.5 px-2.5 flex">
      <div>
        <p className="leading-relaxed text-xs"> {message}</p>
      </div>
      <div className="basis-2/5"></div>
    </div>
  );
}

export default EventInfosUpdatedNotification;

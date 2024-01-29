import capitalize from '../../utils/capitalize';

function InfosFieldFriendProfile({
  name,
  content,
}: {
  name: string;
  content?: string | null;
}) {
  return (
    <div className="grid grid-cols-1 border-none p-2 sm:grid-cols-3 sm:gap-4">
      <dt className=" font-semibold text-primary-1100">{name}</dt>
      <dd
        className="my-auto ml-1 flex 
                      h-12 items-center border-t border-t-primary-300 
                      p-1 text-light sm:col-span-2"
      >
        {capitalize(content ?? '')}
      </dd>
    </div>
  );
}

export default InfosFieldFriendProfile;

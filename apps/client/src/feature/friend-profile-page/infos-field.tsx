import capitalize from '../../utils/capitalize';

function InfosFieldFriendProfile({
  name,
  content,
}: {
  name: string;
  content?: string | null;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 p-2 border-none">
      <dt className=" text-primary-1100 font-semibold">{name}</dt>
      <dd
        className="flex items-center text-light 
                      sm:col-span-2 border-t-primary-300 border-t h-12 
                      my-auto ml-1 p-1"
      >
        {capitalize(content ?? '')}
      </dd>
    </div>
  );
}

export default InfosFieldFriendProfile;

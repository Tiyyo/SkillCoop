import capitalize from '../../../../utils/capitalize';
/*eslint-disable*/
import associateNumberToString from '../../../../utils/associate-number-stringscale';
import { useEffect, useState } from 'react';
import { invitationStatus } from '@skillcoop/types';
import { useEvent } from '../../../../store/event.store';
import AvatarSmallWithBorder from '../../../../component/avatar/avatar-border-small';
/*eslint-enabled*/
type SearchProfileCardProps = {
  avatar: string;
  username: string;
  friendId: number;
  lastEvaluationRecorded?: number | null;
};

function SearchProfileCard({
  avatar,
  username,
  friendId,
  lastEvaluationRecorded,
}: SearchProfileCardProps) {
  // handle selection of friends to invite to event
  const [isSelected, setIsSelected] = useState(false);
  const { addToStaged, removeFromStaged, data: eventStateData } = useEvent();

  const handleClickSelection = () => {
    if (isSelected) {
      removeFromStaged(friendId);
      setIsSelected(false);
    } else {
      const updatedParticipantInfos = {
        profile_id: friendId,
        username: username,
        avatar: avatar ?? null,
        status: invitationStatus.pending,
      };
      addToStaged(updatedParticipantInfos);
    }
  };

  if (eventStateData) {
    const isSelected = eventStateData.staged_participants?.some(
      (p) => p.profile_id === friendId,
    );
    isSelected && setIsSelected(true);
  }

  // useEffect(() => {
  //   if (!eventStateData) return;
  //   const isSelected = eventStateData.staged_participants?.some(
  //     (p) => p.profile_id === friendId,
  //   );

  //   if (isSelected) {
  //     setIsSelected(true);
  //   }
  // }, [eventStateData]);

  return (
    <div
      className={`flex flex-col items-center py-2 px-3 gap-3 cursor-pointer 
          rounded-md border-2 border-transparent basis-52 ${
            isSelected
              ? ' border-opacity-50 border-primary-400 bg-primary-500 shadow-2xl'
              : 'bg-base-light'
          }}`}
      onClick={handleClickSelection}
    >
      <AvatarSmallWithBorder avatar={avatar} />
      <div className="flex flex-col gap-1">
        <p className="text-center text-xs">{username}</p>
        <p className="text-center text-xxs text-light">
          {lastEvaluationRecorded &&
            capitalize(associateNumberToString(lastEvaluationRecorded))}
        </p>
      </div>
    </div>
  );
}

export default SearchProfileCard;

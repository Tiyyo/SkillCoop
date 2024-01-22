/*eslint-disable*/
import associateNumberToString from '../../../../utils/associate-number-stringscale';
import { invitationStatus } from '@skillcoop/types/src';
import { useEvent } from '../../../../stores/event.store';
import AvatarSmallWithBorder from '../../../../components/avatar/avatar-border-small';
/*eslint-enabled*/
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('skill');
  const translatedLastEvaluation =
    lastEvaluationRecorded &&
    t(associateNumberToString(lastEvaluationRecorded));
  // handle selection of friends to invite to event
  const { addToStaged, removeFromStaged, data: eventStateData } = useEvent();
  // TODO : use useMemo if performance issue
  const isSelected = eventStateData.staged_participants?.some(
    (p) => p.profile_id === friendId,
  );

  const handleClickSelection = () => {
    if (isSelected) {
      removeFromStaged(friendId);
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

  return (
    <div
      className={`flex basis-52 cursor-pointer flex-col items-center gap-3 rounded-md 
          border-2 border-transparent px-3 py-2 ${
            isSelected
              ? ' border-primary-400 border-opacity-50 bg-primary-500 shadow-2xl'
              : 'bg-base-light'
          }}`}
      onClick={handleClickSelection}
    >
      <AvatarSmallWithBorder avatar={avatar} />
      <div className="flex flex-col gap-1">
        <p className="text-center text-xs">{username}</p>
        <p className="text-center text-xxs text-light">
          {translatedLastEvaluation}
        </p>
      </div>
    </div>
  );
}

export default SearchProfileCard;

import { useMutation } from "@tanstack/react-query";
import { useCreateEvent } from "../../store/createEvent";
import { useEffect, useState } from "react";

interface FriendCardProps {
  avatar: string;
  username: string;
  adderId: number;
  friendId: number;
  status: string;
  activeSelected?: boolean;
  createdAt?: string;
}

function FriendCard({
  avatar,
  username,
  adderId,
  friendId,
  status,
  activeSelected,
}: FriendCardProps) {
  // const {mutate : acceptOrDeclinedInvitation} = useMutation()
  const { addInvitedParticipantsIds, removeInvitedParticipantsIds, data } =
    useCreateEvent();
  const [isSelected, setIsSelected] = useState(false);

  const handleClickSelectFriend = () => {
    if (!activeSelected) return;
    if (isSelected) {
      removeInvitedParticipantsIds(friendId);
      setIsSelected(false);
    } else {
      addInvitedParticipantsIds(friendId);
    }
  };

  const handleActionOnInviation = (e: any) => {
    const action = e.target.value;
    const data = {
      adder_id: adderId,
      friend_id: friendId,
      status_name: action,
    };
    // acceptOrDeclinedInvitation(data)
  };

  useEffect(() => {
    if (!data || !data.invited_participants_ids) return;
    if (data.invited_participants_ids.find((id) => id === friendId)) {
      setIsSelected(true);
    }
  }, [data]);

  if (status === "declined") return null;
  return (
    <div
      className={`flex py-2 px-3 gap-3 cursor-pointer rounded-md border-2 border-transparent ${
        isSelected
          ? " border-opacity-50 border-primary-400 bg-primary-500 shadow-2xl"
          : "bg-base-light"
      }}`}
      onClick={handleClickSelectFriend}
    >
      <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
      <div className="flex flex-col">
        <p className="text-xs">{username}</p>
        <div className="flex items-baseline">
          <p className="text-xxs text-light">Level</p>
          {status === "pending" ? (
            <div onClick={handleActionOnInviation}>
              <button value="declined">Decline</button>
              <button value="confirmed">Accept</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default FriendCard;

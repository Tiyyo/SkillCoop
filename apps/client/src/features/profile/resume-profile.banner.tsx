import TriggerEditBtn from './trigger-edit-btn';
import AvatarEdit from './edit-avatar';

type ResumeProfileBannerProps = {
  avatar: string | null;
  profileId: string | undefined;
  getCurrentState: (state: boolean) => void;
};

function ResumeProfileBanner({
  avatar,
  profileId,
  getCurrentState,
}: ResumeProfileBannerProps) {
  return (
    <div
      className="-top-12 flex 
             flex-col border-b border-b-grey-light bg-base-light pl-6"
    >
      <div className="relative flex items-center gap-x-5 py-4 ">
        <AvatarEdit avatar={avatar} profileId={profileId} />
        <TriggerEditBtn
          className="absolute right-3 top-3"
          getCurrentState={getCurrentState}
        />
      </div>
    </div>
  );
}

export default ResumeProfileBanner;

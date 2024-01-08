import Container from '../../layout/container';
import { EventParticipant, EventStatus } from '@skillcoop/types/src';
import Participant from '../participant';
import TitleH2 from '../title-h2';

type TeamProps = {
  participants?: EventParticipant[] | string | null;
  currentIdActive?: string;
  title?: string;
  teamTofileter?: number;
  nameInput?: string;
  mvp?: number | null;
  bestStriker?: number | null;
  organizer?: number;
  eventStatus?: EventStatus | null;
};

function Team({
  participants,
  currentIdActive,
  title,
  teamTofileter,
  nameInput,
  mvp,
  bestStriker,
  organizer,
  eventStatus,
}: TeamProps) {
  return (
    <div className="lg:basis-1/2 bg-grey-off">
      {' '}
      <div className="h-7 flex justify-between bg-base-light">
        <div className="w-[45%] bg-grey-off rounded-r-xl"></div>
        <div className="w-[45%] bg-grey-off rounded-l-xl"></div>
      </div>
      <Container className="shadow-none">
        <TitleH2 title={title} />
        <ul
          className="flex flex-wrap lg:grid gap-2 
          lg:grid-cols-particpant-layout justify-center 
          lg:justify-between whitespace-nowrap"
        >
          {/* particpants can be a string if backend failed to parsed data */}
          {participants &&
            typeof participants !== 'string' &&
            participants
              .filter((participant) => participant.team === teamTofileter)
              .map((participant) => (
                <Participant
                  eventStatus={eventStatus}
                  key={participant.profile_id}
                  name={nameInput}
                  activeId={currentIdActive}
                  profileId={participant.profile_id}
                  isAdmin={participant.profile_id === organizer}
                  isMvp={participant.profile_id === mvp}
                  isBestStriker={participant.profile_id === bestStriker}
                  {...participant}
                />
              ))}
        </ul>
      </Container>
    </div>
  );
}

export default Team;

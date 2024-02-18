import Container from '../../../shared/layouts/container';
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
    <div className=" bg-grey-off lg:basis-1/2 lg:rounded-lg">
      <Container className="shadow-none lg:rounded-none lg:rounded-t-lg ">
        <TitleH2 title={title} />
        <ul
          className="flex flex-wrap justify-center gap-2 
          whitespace-nowrap lg:grid 
          lg:grid-cols-particpant-layout lg:justify-between"
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
                  profileIsAdmin={participant.profile_id === organizer}
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

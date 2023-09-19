import { useQuery } from "@tanstack/react-query";
import { useStateContext } from "../../context/app.context";
import Page from "../../layout/Page";
import { getEventsFn } from "../../api/authApi";
import EventCard from "./EventCard";
import { Outlet } from "react-router-dom";
import Plus from "../../assets/icon/Plus";
import { useState } from "react";

function HomePageEvent() {
  const { state } = useStateContext();
  const [ openMenu, setOpenMenu ] = useState(false);
  const userId = state.authUser.userProfile.user_id;
  const today = new Date();

  const {
    data: events,
    isError,
    isLoading,
    isFetching,
  } = useQuery(["getEvents"], () => getEventsFn(userId), { enabled: true });

  const loading = isLoading || isFetching;
  const incomingEvents = events?.filter(
    (event) => today < new Date(event.date)
  );
  const pastEvents = events?.filter((event) => today > new Date(event.date));

  const handleClickMenu = () => {
    setOpenMenu(!openMenu);
  }

  return (
    <Page>
      <div className="bg-primary-800 h-36 py-4 px-3 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <button className="flex flex-col gap-y-1.5 w-10" onClick={handleClickMenu}>
              <span className={`rounded-lg h-1 bg-white ease-cubic duration-300 w-1/2 ${openMenu ? "origin-bottom rotate-45 translate-x-[2px] translate-y-[1px]" : ""}`}></span>
              <span className={`rounded-lg h-1 bg-white ease-cubic duration-300 w-full ${openMenu ? "origin-top -rotate-45" : ""}`}></span>
              <span className={`rounded-lg h-1 bg-white ease-cubic duration-300 ${openMenu ? "origin-bottom w-1/2   translate-x-4 -translate-y-[4px] rotate-45 " : "w-3/4"}`}></span>
          </button>
          <div className="rounded-full overflow-hidden w-10 h-10 shadow-md border-2">
            <img src="/images/default-avatar.png" className="rounded-full" alt="avatar" />
          </div>
        </div>
        <div className="flex items-end justify-between px-2">
          <h1 className="text-3xl text-white font-paytone">Events</h1>
          <div className="text-white border-2 rounded-full p-0.5">
            <Plus/>
          </div>
        </div>
      </div>
      {loading ? (
        <p>...laoding</p>
      ) : (
        <>
          <div>
            <div>
              <div className="flex justify-between pt-6 pb-2 px-3">
                <h2 className="text-sm">Incoming</h2>
                <div className="text-xs text-light">See more</div>
              </div>
              <div className="flex flex-col">
                {incomingEvents?.map((event) => (
                  <EventCard 
                    date={event.date}
                    location={event.location}
                    duration={event.duration}
                    participants={event.participants}
                    requiredParticipants={event.required_participants}
                    confirmedParticipants={event.confirmed_participants}
                    scoreTeamA={event.score_team_1}
                    scoreTeamB={event.score_team_2}
                    userStatus={event.user_status}
                    eventStatus={event.status_name}
                    />
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between pt-6 pb-2 px-3">
                <h2 className="text-sm">Past</h2>
                <div className="text-xs text-light">See more</div>
              </div>
              <div className="flex flex-col gap-y-2">
                {pastEvents?.slice(0, 2).map((event) => (
                  <EventCard 
                    date={event.date}
                    location={event.location}
                    duration={event.duration}
                    participants={event.participants}
                    requiredParticipants={event.required_participants}
                    confirmedParticipants={event.confirmed_participants}
                    scoreTeamA={event.score_team_1}
                    scoreTeamB={event.score_team_2}
                    userStatus={event.user_status}
                    eventStatus={event.status_name}
                    />
                ))}
              </div>
            </div>
          </div>
          <Outlet />
        </>
      )}
    </Page>
  );
}

export default HomePageEvent;

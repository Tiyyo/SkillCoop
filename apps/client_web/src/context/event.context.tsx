// import { UseMutateFunction, useMutation } from "@tanstack/react-query";
// import React from "react";
// import { createEventFn } from "../api/authApi";
// import { CreateEventData } from "../types";

// type State = {
//   start_date: string | null;
//   start_time: string | null;
//   location: string | null;
//   duration: number | null;
//   required_participants: number | null;
//   organizer_id: number | null;
//   status_name: string | null;
//   invited_participants_ids?: number[] | null;
// };


// type Action = {
//   type: string;
//   payload: string | number ;
// };

// type Dispatch = (action: Action) => void;
// type CreateEventContextProviderProps = { children: React.ReactNode };

// const initialState: State = {
//   start_date: null,
//   start_time: null,
//   location: null,
//   duration: null,
//   required_participants: null,
//   organizer_id: null,
//   status_name: "open",
//   invited_participants_ids: null,
// };

// const CreateEventContext = React.createContext<
//   { state: State; dispatch: Dispatch, createEvent : UseMutateFunction<any, unknown, CreateEventData, unknown>  } | undefined
// >(undefined);

// const stateReducer = (state: State, action: Action) => {
//   switch (action.type) {
//     case "SET_DATE": {
//       return { ...state, start_date: action.payload };
//     }
//     case "SET_TIME": {
//       return { ...state, start_time: action.payload };
//     }
//     case "SET_LOCATION": {
//       return { ...state, location: action.payload };
//     }
//     case "SET_DURATION": {
//       return { ...state, duration: action.payload };
//     }
//     case "SET_REQUIRED_PARTICIPANTS": {
//       return { ...state, required_participants: action.payload };
//     }
//     case "SET_ORGANIZER_ID": {
//       return { ...state, organizer_id: action.payload };
//     }
//     case "ADD_INVITED_PARTICIPANTS": {
//       // TODO abstract this logic in a function
//       const pushIdsParticipants = () => {
//         if( state.invited_participants_ids === null) return [action.payload]
//         return state.invited_participants_ids?.push(Number(action.payload))
//       }

//       return {
//         ...state,
//         invitedParticipantsIds: pushIdsParticipants(),
//       };
//     }
//     case "REMOVE_INVITED_PARTICIPANTS": {
//       // TODO abstract this logic in a function
//       const removeIdsParticipants = () => {
//         if( state.invited_participants_ids === null) return null
//         return state.invited_participants_ids?.filter((id) => id !== action.payload)
//       }

//       return {
//         ...state,
//         invited_participants_ids: removeIdsParticipants(),
//       };
//     }
//   }
// };

// const CreateEventContextProvider = ({
//   children,
// }: CreateEventContextProviderProps) => {
//   // @ts-ignore
//   const [state, dispatch] = React.useReducer(stateReducer, initialState);
//   const { mutate: createEvent } = useMutation((data : CreateEventData) => createEventFn(data));

//   const value = { state, dispatch, createEvent };

//   return (
//     <CreateEventContext.Provider value={value}>
//       {children}
//     </CreateEventContext.Provider>
//   );
// };

// const useCreateEventContext = () => {
//   const context = React.useContext(CreateEventContext);

//   if (context) return context;

//   throw new Error(
//     "useCreateEventContext must be used within a CreateEventContextProvider"
//   );
// };

// export { CreateEventContextProvider, useCreateEventContext };

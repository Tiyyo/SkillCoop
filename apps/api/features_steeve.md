### User peut se connecter :

    - Sign up form
    - Sign In form
    - Define validation schema / front
    - Define validation schema / back
    - validate schema front
    - validate schema back
    - create user fonction ( create / hash)
    - login user fonction
    - create token JWT or cookie token ?
    - validate jwt token or cookie token with a route / back
    - store auth information in an UserContext
    - Handle errors front
    - Handle errors back
    - integration test ?

### User peut se deconnecter

    - Logout Btn
    - function clear cookies / back

### User peut acceder a son profil

    - Define route react router
    - Implement protected route component or function
    - Create profile page component
    - Created route to get profile infos / back
    - Make an api call to get infos

### User peut editer son profil

    - Create forms info
    - Display current info in forms
    - Validate data front
    - Create mutation call front
    - Update state on mutation
    - Create route
    - Validate data back
    - Store data
    - handle errors / front
    - handle errors / back

## User peut ajouter/modifier sa photo de profil

    - Define a default avatar if no photo is set
    - Create avatar
    - Create upload indicator
    - Upload photo to api
    - Create random slug
    - resize stream
    - store file in public directory
    - store url and title db
    - update user avatar in db
    - return user infos updated to front

### User peut choisir son theme

    - Create an app context ?
    - create 2 separate theme ?
    - create switch theme btn  ?
    - or ?
    - use tw dark: class ?
    - let prefers-color-schemes ?
    - do the work ?

### User peut choiir un sport

    - Create select input
    - Query to know which sport is avaiable
    - create route back

### User peut s'attribuer une valeur

    - Create form
    - Mutation call
    - Validate data / front
    - Create route
    - Validate data / back
    - Create service to associate a string to a number
    - store value db
    - handle error / front
    - handle error / back
    - Unit testing on service

### User peut acceder a sa liste d'amis

    - Create route friendslist react router
    - Create route back to get all friends
    - Create query to fetch data
    - check friendship relation in 2 sens a -> b b -> a
    - Display pending invitation
    - Display confirmed invitation

### User peut accepter des demandes d'amitié

    - Display a btn to handle validation
    - Create route back
    - validation data back
    - update relation a -> b and add confirmed status
    - create relation b -> a and add confirmed status
    - update state
    - handle error front
    - handle error back

## User peut refuser des demandes d'amitié

    - Display a btn to handle reject
    - Create route back
    - validation data back
    - update relation a -> b and add reject status
    - create relation b -> a and add reject status
    - update state
    - handle error front
    - handle error back

### User peut ajouter un contact

    - Implement search by mail or pseudo
    - Btn send request
    - update state react
    - create route to handle request back
    - create friendship and add pending status to relation
    - where are we gonna accept friendship request ?
    - handle error back
    - handle error front

### User peut acceder à l'historique des évenements

    - Create react router route and component
    - Create query to fetch data
    - Create route back to handle query
    - Create event component
    - Display data
    - handle errors / back
    - handle erros / front

### User peut creer un evenement

    - Create from
    - validate data mutation front
    - create route back
    - validate data back
    - create chat this evenement
    - redirect to Ongoing event

### User peut invité des amis à un evenement

    - display friendlist on evevement
    - create mutation front
    - create route to handle request
    - store junction table add pending status
    - update state react
    - handle error front
    - handle error back

## User peut modifier un évenement en tant qu'organisateur

    - Display call to action if user_id = organizer_id
    - create function to handle mutation
    - validate data front
    - create route to handle updates
    - validate data back
    - update state react
    - handle error front
    - handle error back

### User peut rejoindre un évenement

    - display invitation
    - mutation call
    - create route to handle request
    - check event participants
    - update status if nb_max reach
    - update particpant status to confirmed
    - update state react

### User peut acceder au chat

    - display btn to join chat
    - retrieve hisotry
    - store message db ?
    - maybe store history to Redis db to just have store string without constraint and      automatic delete

### User which organize an event can confirm and generate balanced teams

    - Mutation call to trigger an algo
    - create algo : * get nb_team and nb_max_participant from event
                    * join user on event_id
                    * join sport_on_user
                    * select (rating / nb_rating)
                    * group by user_id
                    * get arrary [ {user_id : value, user_id : value} ]
                    * get array user_id => userId =[id1, id3, id3,  ...]
                    * get array value => value = [value1, value2,  ...]
                    * team_1 = []
                    * team_2 = []
                    * find best value
                    * assign randomly to team_1 or team_2 // Math.random between 0 - nb_team
                    * team_first = [value_max]
                    * team_frist = [userId[index_value_max]]
                    * delete value_max from array and replace it by a string like "a"
                    * delete value_max and userId[index_value_max]
                    * find best value
                    * check if it's number
                    * team_first reduce a + b // could avoid reduce if we store value array as state at beginning
                    * team_second reduce  a + b  // same thing
                    * check which team have less values
                    * push value_max and userId[index_value_max] in team with less value
                    * repeat until started arrays doesnt contains any number or are empty
                    * recursive function seem to be the best to way to achieve this
                      complexity 0(n^2) or 0(k ^ n)???

    - store teams for event but where ?
    - add a row teams in user_on_event and assign a value 1 or 2 for teams ?
    - update event infos
    - return infos

### User which is an organizer can indicate the score

    - ???

### Users can rate each others when an event is done

    - Create a component
    - Query participant list
    - create route to handle get request
    - Create form
    - progress input
    - create mutation call
    - check data
    - increment database

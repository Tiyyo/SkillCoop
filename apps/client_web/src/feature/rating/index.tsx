import ReturnBtn from '../../component/return';
import TitleH2 from '../../component/title-h2';
import { useApp } from '../../store/app.store';
import FieldsetRadioInput from './FieldsetRadioInput';

function UserResumeSkills() {
  const { userProfile } = useApp();
  const hasSkills = !!userProfile?.gb_rating;
  const skills = [
    // 'defending',
    // 'dribbling',
    // 'passing',
    // 'shooting',
    'pace',
  ];

  console.log(userProfile);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const data = {
      // defending: e.target.defending.value,
      // dribbling: e.target.dribbling.value,
      // passing: e.target.passing.value,
      // shooting: e.target.shooting.value,
      pace: e.target.pace.value,
    };
    console.log(data);
  };

  return (
    <div>
      <ReturnBtn />
      <TitleH2 value="Your skills" />
      {!hasSkills && (
        <>
          <p className="text-sm px-4 italic">
            You haven't estimated your skills yet. Estimating your skills allows
            the algorithm to more accurately match users during event
            matchmaking.
          </p>
          <form onSubmit={handleSubmit}>
            {skills.map((skill) => (
              <FieldsetRadioInput
                name={skill}
                options={['beginner', 'novice', 'intermediate', 'expert']}
              />
            ))}
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
}

export default UserResumeSkills;

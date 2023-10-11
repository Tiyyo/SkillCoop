import { Check, Edit2 } from 'lucide-react';
import { useState } from 'react';

function TriggerEditBtn({
  getCurrentState,
  className,
}: {
  getCurrentState: (arg: boolean) => void;
  className?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleClickToggle = () => {
    setIsEditing(!isEditing);
    getCurrentState(isEditing);
  };

  return (
    <>
      {!isEditing ? (
        <button
          type="button"
          className={className}
          onClick={handleClickToggle}>
          <Edit2
            className="text-light"
            size={18}
          />
        </button>
      ) : (
        <button
          type="button"
          className={className}
          onClick={handleClickToggle}>
          <Check
            className="text-light"
            size={18}
          />
        </button>
      )}
    </>
  );
}

export default TriggerEditBtn;

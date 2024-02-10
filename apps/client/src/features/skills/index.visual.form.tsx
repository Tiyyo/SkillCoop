import FieldsetRadioInput from './fieldset-radio.input';
import Button from '../../components/button';
import { ALL_SKILLS } from '../../shared/constants/skill-constant';
import { LEVEL_SCALE } from '../../shared/constants/skill-constant';
import { useTranslation } from 'react-i18next';
import { useId } from 'react';

type EvaluationSkillFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function EvaluationSkillForm({ handleSubmit }: EvaluationSkillFormProps) {
  const { t } = useTranslation('skill');
  const idComp = useId();
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center py-4">
      {ALL_SKILLS.map((skill) => (
        <FieldsetRadioInput
          key={idComp + skill}
          name={skill}
          options={LEVEL_SCALE}
        />
      ))}
      <Button
        type="submit"
        textContent={t('event:sendEvaluation')}
        className="my-8 self-center text-sm"
      />
    </form>
  );
}

export default EvaluationSkillForm;

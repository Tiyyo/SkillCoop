import { useTranslation } from 'react-i18next';

type InfosMembersTriggerProps = {
  toggle: (value: boolean) => void;
  value: boolean;
};

function InfosMembersTrigger({ toggle, value }: InfosMembersTriggerProps) {
  const { t } = useTranslation('chat');
  return (
    <div className="flex justify-between">
      <p className="text-xs font-medium text-primary-1100">{t('members')}</p>
      <button
        className="text-xs font-medium text-primary-1100"
        onClick={() => toggle(!value)}
      >
        {t('add')} <span>{value ? '-' : '+'}</span>
      </button>
    </div>
  );
}

export default InfosMembersTrigger;

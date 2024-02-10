import { useTranslation } from 'react-i18next';
function SeparatorLine() {
  const { t } = useTranslation();
  return (
    <div className="my-2.5 flex w-full items-center justify-center">
      <div
        className="h-0.5 w-2/5 border-t 
        border-border border-opacity-30"
      ></div>
      <span className="mx-2 font-light text-grey-sub-text">{t('auth:or')}</span>
      <div
        className="h-0.5 w-2/5 border-t 
        border-border border-opacity-30"
      ></div>
    </div>
  );
}

export default SeparatorLine;

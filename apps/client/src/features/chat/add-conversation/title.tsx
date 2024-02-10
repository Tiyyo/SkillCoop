import { useTranslation } from 'react-i18next';

type AddConversationTitleProps = {
  typeConversation: 'group' | 'oneToOne' | 'event';
};

function AddConversationTitle({ typeConversation }: AddConversationTitleProps) {
  const { t } = useTranslation('chat');

  return (
    <h2 className="text-md font-semibold">
      {typeConversation === 'oneToOne' ? (
        <>{t('newDiscussion')}</>
      ) : (
        <>{t('newGroupDiscussion')}</>
      )}
    </h2>
  );
}

export default AddConversationTitle;

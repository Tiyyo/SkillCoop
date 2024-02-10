import { useTranslation } from 'react-i18next';
import EditModalPassword from './modal-edit-password';
import { Edit2, Lock } from 'lucide-react';

function ResumeProfilePassword() {
  const { t } = useTranslation('system');
  return (
    <div className="flex justify-between pr-3">
      <div className="flex w-full max-w-xs items-center gap-x-2.5 py-4">
        <div className="basis-7 text-primary-100">
          <Lock size={18} />
        </div>
        <div className="flex flex-grow flex-col gap-y-1">
          <label
            htmlFor="email"
            className="ml-2 block h-4 text-start text-xs font-medium
                     text-grey-sub-text"
          >
            {t('password')}
          </label>
          <input
            type="password"
            defaultValue={'nicetrynotyours'}
            readOnly
            disabled
            className="border-secondary-400 peer block 
                    w-full bg-transparent px-2.5 pb-1.5 pt-3 text-sm"
          />
        </div>
      </div>
      <EditModalPassword>
        <Edit2 className="text-light" size={18} />
      </EditModalPassword>
    </div>
  );
}

export default ResumeProfilePassword;

import { Link } from 'react-router-dom';
import TitleH2 from '../../../../components/title-h2';
import Container from '../../../../layouts/container';
import { useTranslation } from 'react-i18next';

function HeaderEventList({
  title,
  linkTo,
  linkOff,
  legendHeader,
}: {
  title: string;
  linkTo?: string;
  linkOff?: boolean;
  legendHeader?: string;
}) {
  const { t } = useTranslation('system');
  return (
    <Container
      className="flex w-full items-center justify-between 
      lg:my-4 lg:rounded-lg"
    >
      <TitleH2 title={title} legend={legendHeader} />
      {!linkOff &&
        (linkTo ? (
          <Link to={linkTo} className="text-xs text-light">
            {t('seeMore')}
          </Link>
        ) : (
          <div className="text-xs text-light">{t('seeMore')}</div>
        ))}
    </Container>
  );
}

export default HeaderEventList;

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './Link.css';

function Link({
  href,
  children,
  getInfo = false,
  withIcon = false,
  isLocal = false,
}) {
  const [info, setInfo] = useState('. . .');

  useEffect(() => {
    async function setNewInfo() {
      try {
        setInfo(await getInfo());
      } catch (err) {
        console.error(err);
      }
    }

    if (getInfo) {
      setNewInfo();
    }
  }, [getInfo]);

  return (
    <a
      className={classNames('link', {
        'link_with-info': !!getInfo,
        'link_with-icon': withIcon,
        link_type_local: isLocal,
      })}
      href={href}
      data-content={info}
    >
      {children}
    </a>
  );
}

export default Link;

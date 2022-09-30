import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './LinkWithIcon.css';

function LinkWithIcon({ href, children, getInfo = false }) {
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
      className={classNames('link-with-icon', {
        'link-with-icon_with-info': !!getInfo,
      })}
      href={href}
      data-content={info}
    >
      {children}
    </a>
  );
}

export default LinkWithIcon;

import { Fragment } from 'react';

import Navigation from './Navigation';

const Layout: React.FC<{ children: JSX.Element }> = (props) => {
  return (
    <Fragment>
      <Navigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;

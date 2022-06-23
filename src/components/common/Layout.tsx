import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

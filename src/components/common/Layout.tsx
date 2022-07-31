import Navigation from './Navigation';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="relative min-h-screen theme-light">
      <Navigation />
      <main className="mt-24 pb-36">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

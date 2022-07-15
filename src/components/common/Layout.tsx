import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <main className="mt-24 pb-36">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

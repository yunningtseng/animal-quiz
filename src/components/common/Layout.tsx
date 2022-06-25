import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <main className="pb-16">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

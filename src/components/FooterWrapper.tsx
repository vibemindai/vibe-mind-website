import { ReactNode } from "react";
import Footer from "./Footer";

interface FooterWrapperProps {
  children: ReactNode;
}

const FooterWrapper = ({ children }: FooterWrapperProps) => {
  return (
    <div className="relative">
      {/* Fixed footer for parallax - DESKTOP ONLY (lg+) */}
      <div className="hidden lg:block fixed bottom-0 left-0 right-0 z-0">
        <Footer />
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10 pointer-events-none">
        {/* Content area */}
        <div className="bg-background pointer-events-auto">{children}</div>

        {/* Spacer for parallax reveal - DESKTOP ONLY */}
        <div className="hidden lg:block h-[350px] pointer-events-none" aria-hidden="true" />
      </div>

      {/* Normal footer - MOBILE/TABLET ONLY (< lg) */}
      <div className="lg:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default FooterWrapper;

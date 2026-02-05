const Footer = () => {
  return (
    <footer className="bg-primary sticky bottom-0 z-50 text-primary-foreground">
      {/* Bottom Info */}
      <div className="bg-background2 border-t">
        <div className="container mx-auto flex flex-col justify-center items-center gap-3 sm:gap-6 py-4 px-4 text-center sm:text-left text-foreground">
          {/* Left: Copyright */}
          <p className="text-xs sm:text-sm">
            © {new Date().getFullYear()} 2026 HealthCare+. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

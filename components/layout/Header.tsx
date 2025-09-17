import { Button } from "@/components/ui/button";
import ThemeToggleButton from "@/components/layout/header/ThemeToggleButton";
import ActionButtons from "@/components/layout/header/ActionButtons";
import HeaderTitle from "@/components/layout/header/HeaderTitle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <HeaderTitle />
        <div className="flex items-center gap-2">
          <ActionButtons />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;

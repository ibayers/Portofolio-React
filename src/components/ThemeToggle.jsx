import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const [isdarkmode, setisdarkmode] = useState(false);

  useEffect(() => {
    const storedthem = localStorage.getItem("theme-v2");
    if (storedthem === "light") {
      setisdarkmode(false);
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme-v2", "dark");
      document.documentElement.classList.add("dark");
      setisdarkmode(true);
    }
  }, []);

  const toogletheme = () => {
    if (isdarkmode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme-v2", "light");
      setisdarkmode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme-v2", "dark");
      setisdarkmode(true);
    }
  };
  return (
    <button
      onClick={toogletheme}
      className={cn(
        "fixed max-sm:hidden top-5 right-5 z-50 rounded-full transition-colors duration-300",
        "focus:outlin-hidden"
      )}
    >
      {isdarkmode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
};

export default ThemeToggle;

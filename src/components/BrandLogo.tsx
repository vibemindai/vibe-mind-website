import { useTheme } from "@/hooks/useTheme";

const LOGO_LIGHT = "/vibemind-logo-light.svg";
const LOGO_DARK = "/vibemind-logo-dark.svg";

interface BrandLogoProps {
  className?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
}

const BrandLogo = ({
  className = "h-32 md:h-[10rem] w-auto",
  width = 120,
  height = 40,
  loading = "eager",
}: BrandLogoProps) => {
  const { theme } = useTheme();
  const src = theme === "light" ? LOGO_LIGHT : LOGO_DARK;

  return (
    <img
      src={src}
      alt="Vibe Mind AI Solutions Logo"
      width={width}
      height={height}
      loading={loading}
      className={className}
    />
  );
};

export default BrandLogo;

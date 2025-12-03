import {
  MdHome,
  MdDarkMode,
  MdLightMode,
  MdMenu,
  MdClose,
  MdExpandMore,
  MdExpandLess,
  MdSend,
  MdUpload,
  MdArrowForward,
  MdSmartphone,
  MdFlight,
  MdGamepad,
  MdArrowBack,
  MdCheck,
  MdOpenInNew,
  MdEmail,
  MdBugReport,
} from "react-icons/md";
import { IconType, IconBaseProps } from "react-icons";
import { cn } from "@/lib/utils";

export type IconProps = IconBaseProps & {
  className?: string;
};

const withStyle = (Icon: IconType) => ({ className, size = 24, ...props }: IconProps) => (
  <Icon size={size} className={cn("transition-colors", className)} {...props} />
);

export const Icons = {
  Home: withStyle(MdHome),
  Moon: withStyle(MdDarkMode),
  Sun: withStyle(MdLightMode),
  Menu: withStyle(MdMenu),
  X: withStyle(MdClose),
  ChevronDown: withStyle(MdExpandMore),
  ChevronUp: withStyle(MdExpandLess),
  Send: withStyle(MdSend),
  Upload: withStyle(MdUpload),
  ArrowRight: withStyle(MdArrowForward),
  ArrowLeft: withStyle(MdArrowBack),
  Smartphone: withStyle(MdSmartphone),
  Plane: withStyle(MdFlight),
  Gamepad2: withStyle(MdGamepad),
  Check: withStyle(MdCheck),
  ExternalLink: withStyle(MdOpenInNew),
  Mail: withStyle(MdEmail),
  Bug: withStyle(MdBugReport),
};
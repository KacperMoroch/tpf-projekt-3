import React from 'react';
import { 
  LuRefrigerator, LuBookOpen, LuHeart, LuUser, LuSearch, LuSlidersHorizontal,
  LuBell, LuCircleHelp, LuLogOut, LuFileText, LuShieldCheck, LuGlobe,
  LuCalendar, LuUtensils, LuShoppingCart, LuLeaf, LuClock, LuFlame,
  LuArrowLeft, LuShare2, LuStar, LuCircleCheck, LuCircle, LuMessageSquare, 
  LuPlay, LuTimer, LuEllipsisVertical, LuEye, LuPause, LuRotateCcw, LuTriangleAlert, 
  LuX, LuFish, LuCitrus, LuDroplet, LuSend, LuSparkles 
} from "react-icons/lu";

const iconMap = {
  fridge: LuRefrigerator, recipes: LuBookOpen, favorites: LuHeart, profile: LuUser,
  search: LuSearch, filter: LuSlidersHorizontal, bell: LuBell, help: LuCircleHelp,
  logout: LuLogOut, file: LuFileText, shield: LuShieldCheck, globe: LuGlobe,
  calendar: LuCalendar, utensils: LuUtensils, cart: LuShoppingCart, leaf: LuLeaf,
  clock: LuClock, flame: LuFlame, 
  arrowLeft: LuArrowLeft, share: LuShare2, star: LuStar, checkCircle: LuCircleCheck, 
  circle: LuCircle, message: LuMessageSquare, play: LuPlay, timer: LuTimer,
  more: LuEllipsisVertical, eye: LuEye, pause: LuPause, reset: LuRotateCcw, 
  alert: LuTriangleAlert, close: LuX,
  fish: LuFish, lemon: LuCitrus, droplet: LuDroplet, send: LuSend,
  sparkles: LuSparkles, triangleAlert: LuTriangleAlert // 
};

const Icon = ({ name, size = 24, className, style, ...props }) => {
  const SelectedIcon = iconMap[name];
  if (!SelectedIcon) return null;
  return <SelectedIcon size={size} className={className} style={style} {...props} />;
};

export default Icon;
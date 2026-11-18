import type { LucideIcon } from "lucide-react-native";
import { BookPlusIcon, HomeIcon, SettingsIcon, ShoppingBagIcon, SmileIcon, SwordIcon } from "lucide-react-native";

export interface Tab
{
    name: string;
    title: string;
    icon: LucideIcon;
}

export interface TabIconProps
{
    focused: boolean,
    icon: LucideIcon,
}

export const TabsData: Tab[] = [
    {
        name: "index",
        title: "Home",
        icon: HomeIcon,
    },
    {
        name: "insights",
        title: "Insight",
        icon: BookPlusIcon,
    },
    {
        name: "settings",
        title: "Setting",
        icon: SettingsIcon,
    },
    {
        name: "subscriptions",
        title: "Subscription",
        icon: SwordIcon,
    },
    {
        name: "funfun",
        title: "FunTest",
        icon: SmileIcon,
    },
    {
        name: "treasures",
        title: "Treasures",
        icon: ShoppingBagIcon,
    },
]
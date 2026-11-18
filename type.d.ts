import type { LucideIcon } from "lucide-react-native";
import { Rarity } from "./constants/enums/rarity";



declare global {
    type PositionSlot = {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null;

    interface AppTab {
        name: string;
        title: string;
        icon: LucideIcon;
    }

    interface MoneyFarmPrototype {
        id : string;
        name : string;
        rarity : Rarity;
        produceMoney : number;
    }

    interface MoneyFarm {
        id : string;
        name : string;
        rarity : Rarity;
        produceMoney : number;
        bonusBuff : BonusBuff; // Óng ánh | Rainbow | Shiny | Golden | ...
    }

    interface SlotComponent {
        container : MoneyFarm;
        quantity : number;
    }

    interface RarityProportion {
        common : number;
        uncommon : number;
        rare : number;
        epic : number;
        legendary : number;
        mythic : number;
    }

    // Mỗi một cái instance dataChest thì nên tạo thông qua Factory Pattern??
    interface DataChest { // Mỗi một cái DataChest chứa một cái pool { tree1 (epic), tree2 (rare),...}
        idName : string;
        name : string;
        color : string;
        chestRarity : string;
        pool : MoneyFarmPrototype[];
        rarity : RarityProportion;
        cost : number;
    }

    //------------------------------------------------------------

    interface TabIconProps {
        focused: boolean;
        icon: LucideIcon
    }

    interface Subscription
    {
        id: string;
        icon: LucideIcon;
        name: string;
        plan?: string;
        category?: string;
        paymentMethod?: string;
        status?: string;
        startDate?: string;
        price: number;
        currency?: string;
        billing: string;
        renewalDate?: string;
        color?: string;
    }

    interface SubscriptionCardProps extends Omit<Subscription, "id"> {
        expanded: boolean;
        onPress: () => void;
        onCancelPress?: () => void;
        isCancelling?: boolean;
    }

    interface UpcomingSubscription
    {
        id: string;
        icon: LucideIcon;
        name: string;
        price: number;
        currency?: string;
        daysLeft: number;
    }

    interface UpcomingSubscriptionCardProps
        extends Omit<UpcomingSubscription, "id"> {}

    interface ListHeadingProps {
        title: string;
    }

    interface DataFarmingSlot {
        container: MoneyFarm | null,
        idSlot: number,
    }

    interface Chest {
        id: number;
        name: string;
        rarity: string;
        color: string;
        description: string;
    }
}



export { };


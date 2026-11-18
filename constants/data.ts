import { DatabaseArrowDownIcon, FilmIcon, MicrowaveIcon, Music2Icon, NotebookPenIcon } from "lucide-react-native";
import { Rarity } from "./enums/rarity";

export const ITEM_WIDTH = 220;
export const ITEM_GAP = 18;
export const SNAP_INTERVAL = ITEM_WIDTH + ITEM_GAP;
export const FARMINGSLOTS_GAP_COLUMNE = 12;
export const FARMINGSLOTS_GAP_ROW = 12;
export const NUMB_COLUMNES = 4;


const DATA_ALL_MONEYFARM: MoneyFarmPrototype[] = [
    {
        id: "money-farm-001-c",
        name: "Chicken",
        rarity: Rarity.Common,
        produceMoney: 5,
    },
    {
        id: "money-farm-002-c",
        name: "Pig",
        rarity: Rarity.Common,
        produceMoney: 7,
    },
    {
        id: "money-farm-003-c",
        name: "Cow",
        rarity: Rarity.Common,
        produceMoney: 9,
    },
    {
        id: "money-farm-001-u",
        name: "Mule",
        rarity: Rarity.Uncommon,
        produceMoney: 11,
    },
    {
        id: "money-farm-002",
        name: "Rainbow Sheep",
        rarity: Rarity.Rare,
        produceMoney: 15,
    },
    {
        id: "money-farm-003",
        name: "Shiny Cow",
        rarity: Rarity.Epic,
        produceMoney: 35,
    },
    {
        id: "money-farm-004",
        name: "Crystal Pig",
        rarity: Rarity.Legendary,
        produceMoney: 80,
    },
    {
        id: "money-farm-005",
        name: "Rainbow Dragon",
        rarity: Rarity.Mythic,
        produceMoney: 200,
    },
    {
        id: "money-farm-006",
        name: "Golden Phoenix",
        rarity: Rarity.Mythic,
        produceMoney: 500,
    },
]

export const SLOT_POSITIONS: Record<number, {
    x: number;
    y: number;
    width: number;
    height: number; }> = {
        1: {
            x: 1,
            y: 1,
            width: 1,
            height: 1,
        }, };

export const CHESTS: Chest[] = [
    {
        id: 1,
        name: "Wooden Chest",
        rarity: "COMMON",
        color: "#A87543",
        description: "A simple chest with basic rewards.",
    },
    {
        id: 2,
        name: "Silver Chest",
        rarity: "RARE",
        color: "#94A3B8",
        description: "Contains some valuable rewards.",
    },
    {
        id: 3,
        name: "Golden Chest",
        rarity: "EPIC",
        color: "#EAB308",
        description: "Contains rare and powerful items.",
    },
    {
        id: 4,
        name: "Magic Chest",
        rarity: "LEGENDARY",
        color: "#A855F7",
        description: "A mysterious chest with legendary loot.",
    },
    {
        id: 5,
        name: "Diamond Chest",
        rarity: "MYTHIC",
        color: "#06B6D4",
        description: "The most precious chest of all.",
    },
];

export const DATA_FARMING_SLOTS: DataFarmingSlot[] = [
    {
        container: null,
        idSlot: 0,
    },
    {
        container: null,
        idSlot: 1,
    },
    {
        container: null,
        idSlot: 2,
    },
    {
        container: null,
        idSlot: 3,
    },
    {
        container: null,
        idSlot: 4,
    },
]

export const HOME_USER = {
    name: "Be Cu Teo",
}

export const HOME_BALANCE = {
    amount: 9009.47,
    nextRenewalData: "2027-1-5T09:00:00.000Z",
}

export const UPCOMING_SUBSCRIPTIONS: UpcomingSubscription[] = [
    {
        id: "netflix",
        icon: FilmIcon,
        name: "Netflix",
        price: 19.99,
        currency: "USD",
        daysLeft: 3,
    },
    {
        id: "spotify",
        icon: Music2Icon,
        name: "Spotify",
        price: 11.99,
        currency: "USD",
        daysLeft: 12,
    },
    {
        id: "notion",
        icon: NotebookPenIcon,
        name: "Notion",
        price: 10.00,
        currency: "USD",
        daysLeft: 18,
    },
    {
        id: "youtube-premium",
        icon: MicrowaveIcon,
        name: "YouTube Premium",
        price: 13.99,
        currency: "USD",
        daysLeft: 25,
    },
]

export const HOME_SUBSCRIPTIONS: Subscription[] = [
    {
        id: "adobe-creative-cloud",
        icon: DatabaseArrowDownIcon,
        name: "Adobe Creative-cloud",
        plan: "Teams Plan",
        category: "Design",
        paymentMethod: "Visa ending in 8530",
        status: "active",
        startDate: "2025-03-20T10:00:00.000Z",
        price: 77.49,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-03-20T10:00:00.000Z"
    },
    {
        id: "netflix-premium",
        icon: FilmIcon,
        name: "Netflix",
        plan: "Premium Plan",
        category: "Entertainment",
        paymentMethod: "Mastercard ending in 4921",
        status: "active",
        startDate: "2025-06-15T10:00:00.000Z",
        price: 19.99,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-12-15T10:00:00.000Z"
    },
    {
        id: "spotify-premium",
        icon: Music2Icon,
        name: "Spotify",
        plan: "Individual Plan",
        category: "Music",
        paymentMethod: "Visa ending in 8530",
        status: "active",
        startDate: "2025-08-10T10:00:00.000Z",
        price: 11.99,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-12-10T10:00:00.000Z"
    },
    {
        id: "notion-plus",
        icon: NotebookPenIcon,
        name: "Notion",
        plan: "Plus Plan",
        category: "Productivity",
        paymentMethod: "PayPal",
        status: "active",
        startDate: "2025-01-05T10:00:00.000Z",
        price: 10.00,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-12-05T10:00:00.000Z"
    },
    {
        id: "youtube-premium",
        icon: MicrowaveIcon,
        name: "YouTube Premium",
        plan: "Family Plan",
        category: "Entertainment",
        paymentMethod: "Visa ending in 2187",
        status: "cancelled",
        startDate: "2025-04-12T10:00:00.000Z",
        price: 22.99,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-11-12T10:00:00.000Z"
    }
]

export const DATA_CHEST: DataChest[] = [
    {
        idName : "ChestTest",
        name : "Chest Test Super Cùi",
        color : "#A87543",
        chestRarity : Rarity.Legendary,
        rarity : {
            common : 10,
            uncommon : 5,
            rare : 3,
            epic : 0,
            legendary : 0,
            mythic : 0,
        },
        cost: 100,
        pool : [DATA_ALL_MONEYFARM[0], DATA_ALL_MONEYFARM[1], DATA_ALL_MONEYFARM[2], DATA_ALL_MONEYFARM[3], DATA_ALL_MONEYFARM[4]],
    },
    {
        idName : "ChestTest2",
        name : "Chest Test Hơi Cùi",
        color : "#00FFFF",
        chestRarity : Rarity.Uncommon,
        rarity : {
            common : 10,
            uncommon : 5,
            rare : 3,
            epic : 0,
            legendary : 0,
            mythic : 0,
        },
        cost: 100,
        pool : [DATA_ALL_MONEYFARM[0], DATA_ALL_MONEYFARM[1], DATA_ALL_MONEYFARM[2], DATA_ALL_MONEYFARM[3], DATA_ALL_MONEYFARM[4]],
    },
]

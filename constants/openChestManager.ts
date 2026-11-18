import * as Crypto from 'expo-crypto';
import { BonusBuff } from "./enums/bonusBuff";
import { Rarity } from "./enums/rarity";


const rarityMap: Record<keyof RarityProportion, Rarity> = {
    common: Rarity.Common,
    uncommon: Rarity.Uncommon,
    rare: Rarity.Rare,
    epic: Rarity.Epic,
    legendary: Rarity.Legendary,
    mythic: Rarity.Mythic,
};

function RollRarity(rarity: RarityProportion): Rarity {
    const entries = Object.entries(rarity) as [keyof RarityProportion, number][];

    const totalWeight = entries.reduce(
        (sum, [, weight]) => sum + weight,
        0
    );

    if (totalWeight <= 0) {
        throw new Error("Total rarity weight must be greater than 0");
    }

    let random = Math.random() * totalWeight;

    for (const [key, weight] of entries) {
        random -= weight;

        if (random < 0) {
            return rarityMap[key];
        }
    }

    throw new Error("Failed to roll rarity");
}

export function OpenChest(chest : DataChest) : MoneyFarm
{
    // Step 1: Roll rarity
    const selectedRarity = RollRarity(chest.rarity);

    // Step 2: Filter pool
    const availableFarms = chest.pool.filter(
        farm => farm.rarity == selectedRarity
    );
    debugger;
    if (availableFarms.length === 0) {
        throw new Error(`No farm found for ${selectedRarity}`);
    }

    // Step 3: Random farm
    const selectedFarm = availableFarms[
        Math.floor(Math.random() * availableFarms.length)
    ];

    // Step 4: Roll buff
    const buffs = Object.values(BonusBuff);

    const selectedBuff = buffs[
        Math.floor(Math.random() * buffs.length)
    ];

    // Step 5: Return instance
    return {
        ...selectedFarm,
        id: Crypto.randomUUID(),
        rarity: selectedRarity,
        bonusBuff: selectedBuff
    };
}
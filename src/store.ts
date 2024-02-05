import { writable } from "svelte/store";

type MerchantLink = {
    link: string
} 

type GlobalState = {
    savedMerchantLinks: MerchantLink[]
}

export const globalState = writable<GlobalState>({
    savedMerchantLinks: []
});
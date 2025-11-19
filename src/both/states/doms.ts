import { ref } from '@both/funcs/ref'

export interface Dom {
    popupsEl: HTMLElement | HTMLBodyElement
}

export const doms = ref<Dom>({
    popupsEl: document.body
})

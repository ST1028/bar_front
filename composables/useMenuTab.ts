import type { Ref } from 'vue'

export const useMenuTab = () => {
    // stateの定義
    const menuTab: Ref<number> = useState('menuTab', () => 0)

    // stateの更新処理
    const updateMenuTab = (menuTab: Ref<number>) => (value: number) => {
        menuTab.value = value;
    }

    return {
        menuTab: readonly(menuTab), // stateはreadonlyとし、update関数を通してのみ更新できる
        updateMenuTab: updateMenuTab(menuTab),
    }
}
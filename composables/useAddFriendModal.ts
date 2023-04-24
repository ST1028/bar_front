import type { Ref } from 'vue'

export const useAddFriendModal = () => {
    // stateの定義
    const addFriendModal: Ref<boolean> = useState('addFriendModal', () => false)

    // stateの更新処理
    const updateAddFriendModal = (menuTab: Ref<boolean>) => (value: boolean) => {
        menuTab.value = value;
    }

    return {
        addFriendModal: readonly(addFriendModal), // stateはreadonlyとし、update関数を通してのみ更新できる
        updateAddFriendModal: updateAddFriendModal(addFriendModal),
    }
}
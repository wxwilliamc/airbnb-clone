// Call if visitor try to register a new account

import { create } from "zustand";

interface RegisterModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useRegisterModal;
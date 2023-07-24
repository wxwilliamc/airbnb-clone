// Call if the user want to upload listing details

import { create } from "zustand";

interface RentModal {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useRentModal = create<RentModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useRentModal;
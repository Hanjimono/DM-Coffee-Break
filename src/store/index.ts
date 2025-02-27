// System
import { create } from "zustand"
// Store
import { createModalStore, ModalState } from "@/store/modal/modalSlice"
import {
  createSnackbarStore,
  SnackbarState
} from "@/store/snackbar/snackbarSlice"
import {
  createMusicPlayerStore,
  MusicPlayerState
} from "@/store/musicPlayer/musicPlayerSlice"
import { createGlobalStore, GlobalState } from "@/store/global/globalSlice"

export const useStore = create<
  ModalState & SnackbarState & MusicPlayerState & GlobalState
>()((...a) => ({
  ...createModalStore(...a),
  ...createSnackbarStore(...a),
  ...createMusicPlayerStore(...a),
  ...createGlobalStore(...a)
}))

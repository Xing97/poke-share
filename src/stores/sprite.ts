import { create } from "zustand"
import { persist } from "zustand/middleware"

export enum Sprite {
  Default = "default",
  Home = "home",
  Official = "official",
}

interface SpriteStore {
  sprite: Sprite
  setSprite: (theme: Sprite) => void
}

export const useSpriteStore = create<SpriteStore>()(
  persist(
    (set) => ({
      sprite: Sprite.Default,
      setSprite(sprite) {
        set({ sprite })
      },
    }),
    { name: "__MW::sprite" }
  )
)

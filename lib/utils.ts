import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUniqueId(prefix = ''): string {
  return (
    prefix +
    Math.random().toString(36).substr(2, 9) +
    Date.now().toString(36)
  )
}

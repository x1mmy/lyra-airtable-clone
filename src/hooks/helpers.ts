import {useEffect, useState} from "react";
import { toast } from "react-toastify";

/**
 * Custom hook to detect if the viewport width is smaller than 600px
 * @returns {boolean} true if viewport width < 600px, false otherwise
 */
export const useSmallerThan600 = () => {
  const [isSmaller, setIsSmaller] = useState(false)
  useEffect(() => {
    // Create a media query to check if screen width is smaller than 600px
    const query = window.matchMedia("(max-width: 599px)")
    const update = () => setIsSmaller(query.matches)
    update() // Set initial value
    query.addEventListener("change", update) // Listen for viewport changes
    return () => query.removeEventListener("change", update) // Cleanup listener
  }, [])
  return isSmaller
}

/**
 * Shows a toast notification indicating a feature is intentionally not built
 * Used for placeholder functionality during development
 */
export const toastNotBuilt = () => toast("Not built on purpose, just hire me pls.")

// Commented out toast functions for future use:
// export const toastNoFunction = () => toast("Not functional on purpose, lmk if you want this implemented!")
// export const toastTODO = (feature: string) => toast(`TODO: ${feature}`)
// export const toastNoWay = () => toast("ain't no way im making this bruh")
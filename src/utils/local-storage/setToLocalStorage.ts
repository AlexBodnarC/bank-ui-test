export default function setToLocalStorage<T>(key: string, data: T) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (error) {
    throw error;
  }
}

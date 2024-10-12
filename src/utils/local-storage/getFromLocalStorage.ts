export default function getFromLocalStorage<T>(key: string) {
  try {
    if (typeof window !== "undefined") {
      const res = window.localStorage.getItem(key);
      if (!res) return;
      const value = JSON.parse(res) satisfies T as T;
      return value;
    }
  } catch (error) {
    throw error;
  }
}

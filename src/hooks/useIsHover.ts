import { useEffect, useRef, useState } from "react";

export default function useIsHover<T extends HTMLElement>() {
  const [isHovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseOver = () => setHovered(true);
  const handleMouseOut = () => setHovered(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, []);

  return { ref, isHovered };
}

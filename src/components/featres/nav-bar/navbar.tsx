"use client";
import { Avatar } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Redo, BadgePoundSterling, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import useIsHover from "~/hooks/useIsHover";

const Items = [
  { name: "Dashboard", isActive: true, icon: LayoutDashboard },
  { name: "Transfer", isActive: false, icon: Redo },
  { name: "Transaction", isActive: false, icon: BadgePoundSterling },
];

export default function NavBar() {
  const path = usePathname()
    .split("/")
    .filter((p) => p !== "");
  const isHiden = path.some((i) => i.includes("login"));

  const { isHovered, ref } = useIsHover();

  if (isHiden) {
    return null;
  }
  return (
    <motion.nav
      animate={isHovered ? { width: "13em" } : { width: "4em" }}
      ref={ref}
      className="glass fixed left-0 z-50 hidden h-full space-y-32 border-white px-2 py-3 text-white sm:block"
    >
      <div className="flex items-center gap-2">
        <Avatar
          src="https://cdn.images.express.co.uk/img/dynamic/36/590x/wolverine-cigars-842878.jpg?r=1686998680160"
          size="md"
        />
        <motion.span
          animate={isHovered ? { opacity: 1 } : { opacity: 1, display: "none" }}
          transition={
            isHovered
              ? {
                  duration: 0.2,
                  delay: 0.2,
                }
              : { delay: -0.5 }
          }
          className="text-lg font-medium"
        >
          Alex Bodnar
        </motion.span>
      </div>

      <div className="flex cursor-pointer flex-col gap-4 pl-2">
        {Items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="flex gap-2 text-white">
              <Icon className="text-white" />
              <motion.p
                animate={
                  isHovered
                    ? { opacity: 1 }
                    : { opacity: 0, display: "none", transitionEnd: {} }
                }
                transition={
                  isHovered
                    ? {
                        duration: 0.2,
                        delay: 0.2,
                      }
                    : { delay: -0.5 }
                }
              >
                {item.name}
              </motion.p>
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
        >
          <ul className="px-6 py-8 space-y-5">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="flex items-baseline gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
              >
                <span className="text-xs text-muted font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="font-display italic text-2xl text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import logo from "@/assets/logo.svg";

export function Nav() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/" aria-label="Mahdieh — Home" className="flex items-center">
          <img src={logo} alt="Mahdieh" className="h-6 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <a href="#contact" className="text-xs font-mono uppercase tracking-[0.2em] border border-foreground rounded-full px-4 py-2 hover:bg-foreground hover:text-background transition-colors">
          Get in touch
        </a>
      </div>
    </motion.header>
  );
}

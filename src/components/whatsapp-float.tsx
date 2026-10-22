import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export default function WhatsappFloat() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Solid Equipment Ltd on WhatsApp"
      className="group fixed right-5 bottom-5 z-50 flex items-center gap-0 rounded-full shadow-2xl shadow-navy-950/40"
    >
      <span className="glass max-w-0 overflow-hidden rounded-full py-3 font-mono text-xs font-semibold whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:mr-3 group-hover:max-w-[240px] group-hover:px-4 group-hover:opacity-100 bg-emerald-600/90! border-emerald-400/30!">
        Chat with our procurement desk
      </span>
      <span className="pulse-ring relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white transition-transform duration-300 group-hover:scale-110">
        <MessageCircle className="h-6 w-6" fill="currentColor" strokeWidth={0} />
      </span>
    </a>
  );
}

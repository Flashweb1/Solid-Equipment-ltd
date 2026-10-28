import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export default function WhatsappFloat() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Solid Equipment Ltd on WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-full bg-emerald-500 py-2 pr-5 pl-2 text-white shadow-lg shadow-emerald-600/25 transition-colors duration-200 hover:bg-emerald-600"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
        <MessageCircle className="h-6 w-6" fill="currentColor" strokeWidth={0} />
      </span>
      <span className="text-sm font-semibold whitespace-nowrap">
        Any question?
      </span>
    </a>
  );
}

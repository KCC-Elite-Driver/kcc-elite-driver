import { MessageCircle } from "lucide-react";

const WhatsAppFloatingButton = () => {
  return (
    <a
      href="https://wa.me/33123456789"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
    </a>
  );
};

export default WhatsAppFloatingButton;

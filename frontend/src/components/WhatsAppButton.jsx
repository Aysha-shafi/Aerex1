const PHONE = "971545253697";
export default function WhatsAppButton() {
  return (
    <a href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Hello AEREX, I'd like to enquire about your products/services.")}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      style={{ position:"fixed",bottom:26,right:26,width:56,height:56,borderRadius:"50%",background:"#1c8a5a",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px -8px rgba(28,138,90,0.6)",zIndex:60 }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.18a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.09.81.83-3.01-.2-.31a8.19 8.19 0 1 1 6.94 3.83zm4.5-6.13c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.56.13-.17.25-.65.8-.79.96-.15.17-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"/>
      </svg>
    </a>
  );
}

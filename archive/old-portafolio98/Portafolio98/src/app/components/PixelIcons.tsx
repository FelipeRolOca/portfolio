export function UserIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="pixelated">
      {/* Head */}
      <rect x="12" y="8" width="8" height="2" fill="#FFD4A3" />
      <rect x="10" y="10" width="12" height="4" fill="#FFD4A3" />
      <rect x="12" y="14" width="8" height="2" fill="#FFD4A3" />
      {/* Eyes */}
      <rect x="12" y="11" width="2" height="2" fill="#000" />
      <rect x="18" y="11" width="2" height="2" fill="#000" />
      {/* Body - blue suit */}
      <rect x="10" y="16" width="12" height="2" fill="#0000AA" />
      <rect x="8" y="18" width="16" height="6" fill="#0000AA" />
      <rect x="10" y="24" width="4" height="4" fill="#0000AA" />
      <rect x="18" y="24" width="4" height="4" fill="#0000AA" />
      {/* Highlights */}
      <rect x="11" y="9" width="2" height="1" fill="#FFF" opacity="0.6" />
    </svg>
  );
}

export function CodeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="pixelated">
      {/* Document */}
      <rect x="6" y="4" width="16" height="24" fill="#FFF" />
      <rect x="6" y="4" width="16" height="24" stroke="#000" strokeWidth="1" fill="none" />
      {/* Code lines */}
      <rect x="8" y="8" width="8" height="2" fill="#0000AA" />
      <rect x="10" y="12" width="10" height="2" fill="#AA0000" />
      <rect x="8" y="16" width="12" height="2" fill="#00AA00" />
      <rect x="10" y="20" width="8" height="2" fill="#0000AA" />
      {/* Corner fold */}
      <rect x="18" y="4" width="4" height="4" fill="#C0C0C0" />
      <path d="M 18 4 L 18 8 L 22 8 Z" fill="#808080" />
    </svg>
  );
}

export function BriefcaseIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="pixelated">
      {/* Briefcase body */}
      <rect x="4" y="14" width="24" height="12" fill="#8B4513" />
      <rect x="4" y="14" width="24" height="12" stroke="#000" strokeWidth="1" fill="none" />
      {/* Top handle area */}
      <rect x="12" y="10" width="8" height="4" fill="#A0522D" />
      <rect x="12" y="10" width="8" height="4" stroke="#000" strokeWidth="1" fill="none" />
      {/* Handle */}
      <rect x="14" y="8" width="4" height="2" fill="#C0C0C0" />
      {/* Highlight */}
      <rect x="5" y="15" width="22" height="2" fill="#A0522D" />
      {/* Lock */}
      <rect x="15" y="19" width="2" height="3" fill="#FFD700" />
    </svg>
  );
}

export function FolderIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="pixelated">
      {/* Folder tab */}
      <rect x="4" y="10" width="10" height="4" fill="#FFCC00" />
      <rect x="4" y="10" width="10" height="4" stroke="#000" strokeWidth="1" fill="none" />
      {/* Folder body */}
      <rect x="4" y="14" width="24" height="12" fill="#FFDD33" />
      <rect x="4" y="14" width="24" height="12" stroke="#000" strokeWidth="1" fill="none" />
      {/* Shadow/depth */}
      <rect x="5" y="15" width="22" height="1" fill="#FFE870" />
      <rect x="27" y="15" width="1" height="10" fill="#CC9900" />
      <rect x="5" y="25" width="22" height="1" fill="#CC9900" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="pixelated">
      {/* Envelope */}
      <rect x="4" y="10" width="24" height="16" fill="#FFF" />
      <rect x="4" y="10" width="24" height="16" stroke="#000" strokeWidth="1" fill="none" />
      {/* Flap */}
      <path d="M 4 10 L 16 18 L 28 10" fill="#E0E0E0" stroke="#000" strokeWidth="1" />
      {/* Stamp */}
      <rect x="22" y="12" width="4" height="4" fill="#AA0000" />
      <rect x="22" y="12" width="4" height="4" stroke="#000" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function FileIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="pixelated">
      {/* Document */}
      <rect x="8" y="4" width="14" height="24" fill="#FFF" />
      <rect x="8" y="4" width="14" height="24" stroke="#000" strokeWidth="1" fill="none" />
      {/* Corner fold */}
      <rect x="18" y="4" width="4" height="4" fill="#C0C0C0" />
      <path d="M 18 4 L 18 8 L 22 8 Z" fill="#808080" />
      {/* Text lines */}
      <rect x="10" y="10" width="10" height="1" fill="#000" />
      <rect x="10" y="13" width="10" height="1" fill="#000" />
      <rect x="10" y="16" width="8" height="1" fill="#000" />
      <rect x="10" y="19" width="10" height="1" fill="#000" />
      <rect x="10" y="22" width="6" height="1" fill="#000" />
    </svg>
  );
}

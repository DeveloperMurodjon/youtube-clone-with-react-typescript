interface NavChanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = ["Home", "Videos", "Shorts", "Playlists", "Community", "About"];

function NavChanel({ activeTab, onTabChange }: NavChanelProps) {
  return (
    <div className="border-b border-gray-700 px-8">
      <div className="flex gap-6 text-gray-400 text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`py-3 border-b-2 transition-all ${
              activeTab === tab
                ? "border-white text-white font-semibold"
                : "border-transparent hover:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NavChanel;

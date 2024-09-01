import { useState } from 'react';

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, name: 'Tab 1', content: "<TabOne />" },
    { id: 1, name: 'Tab 2', content: "<TabTwo />" },
    { id: 2, name: 'Tab 3', content: "<TabThree />" },
  ];

  return (
    <div className="py-10">
      <div className="text-center">
        <div className="mt-4 flex items-center justify-center gap-x-3">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              className={`inline-flex items-center rounded-md border px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                activeTab === index
                  ? 'border-black text-black focus-visible:outline-black'
                  : 'border-gray-300 text-gray-500 focus-visible:outline-gray-300'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="mt-4 p-4 border rounded-md shadow-sm">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
}

export default Tabs;

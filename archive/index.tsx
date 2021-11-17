import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';

export default function Home() {
  const tabs = [
    {
      title: 'Bubble 1',
      content: '',
    },
  ];
  const [bubbles, setBubbles] = useState(tabs);
  const [selectedTab, setSelectedTab] = useState(0);

  const createBubble = () => {
    setBubbles([...bubbles, { title: `Bubble ${bubbles.length + 1}`, content: '' }]);
    setSelectedTab(bubbles.length - 1);
  }
  const deleteBubble = () => {
    if(bubbles.length > 1) {
      const newBubbles = bubbles.slice(0, selectedTab).concat(bubbles.slice(selectedTab + 1));
      setBubbles(newBubbles);
      setSelectedTab(0);
    }
  }
  return (
    <Tabs defaultIndex={selectedTab}>
      <div className="textareas">
        {
          bubbles.map((tab, index) => (
            <TabPanel key={index}>
              <textarea
                placeholder={`Start typing in ${tab.title}...`}
                onChange={(e) => {
                  const newBubbles = [...bubbles];
                  newBubbles[index].content = e.target.value;
                  setBubbles(newBubbles);
                }}
                defaultValue={tab.content}
              />
            </TabPanel>
          ))
        }
      </div>
      <TabList>
        <div className="tab-list">
          {
            bubbles.map((tab, index) => (
              <Tab key={index}>
                <input className="tab-text" defaultValue={tab.title}/>

                <button className="close-tab-button" onClick={deleteBubble}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="close-tab" fill="transparent" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </Tab>
            ))
          }
          <button className="add-tab" onClick={createBubble}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </TabList>
    </Tabs>
  )
}

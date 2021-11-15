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
  return (
    <Tabs>
        {
          bubbles.map((tab, index) => (
            <TabPanel key={index}>
              <textarea
                placeholder="Start typing..."
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
      <TabList>
        {
          tabs.map((tab, index) => (
            <Tab key={index}>
              <div className="tab-text">
                {tab.title}
              </div>
            </Tab>
          ))
        }
      </TabList>
    </Tabs>
  )
}

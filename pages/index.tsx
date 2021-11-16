import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';

export default function Home() {
  const tabs = [
    {
      title: 'Reminders',
      content: '',
    },
    {
      title: 'Shopping List',
      content: '',
    },
    {
      title: 'Meeting Notes',
      content: '',
    },
    {
      title: 'Classes',
      content: '',
    },
    {
      title: 'Reminders',
      content: '',
    },
    {
      title: 'Shopping List',
      content: '',
    },
    {
      title: 'Meeting Notes',
      content: '',
    },
    {
      title: 'Classes',
      content: '',
    },
    {
      title: 'Reminders',
      content: '',
    },
    {
      title: 'Shopping List',
      content: '',
    },
    {
      title: 'Meeting Notes',
      content: '',
    },
    {
      title: 'Classes',
      content: '',
    },
    {
      title: 'Reminders',
      content: '',
    },
    {
      title: 'Shopping List',
      content: '',
    },
    {
      title: 'Meeting Notes',
      content: '',
    },
    {
      title: 'Classes',
      content: '',
    },
    {
      title: 'Reminders',
      content: '',
    },
    {
      title: 'Shopping List',
      content: '',
    },
    {
      title: 'Meeting Notes',
      content: '',
    },
    {
      title: 'Classes',
      content: '',
    },
    {
      title: 'Reminders',
      content: '',
    },
    {
      title: 'Shopping List',
      content: '',
    },
    {
      title: 'Meeting Notes',
      content: '',
    },
    {
      title: 'Classes',
      content: '',
    },
    {
      title: 'Reminders',
      content: '',
    },
    {
      title: 'Shopping List',
      content: '',
    },
    {
      title: 'Meeting Notes',
      content: '',
    },
    {
      title: 'Classes',
      content: '',
    },
    {
      title: 'Reminders',
      content: '',
    },
    {
      title: 'Shopping List',
      content: '',
    },
    {
      title: 'Meeting Notes',
      content: '',
    },
    {
      title: 'Classes',
      content: '',
    },

  ];
  const [bubbles, setBubbles] = useState(tabs);
  return (
    <Tabs>
      <div className="textareas">
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
      </div>
      <TabList>
        <div className="tab-list">
          {
            tabs.map((tab, index) => (
              <Tab key={index}>
                <div className="tab-text">
                  {tab.title}
                </div>
              </Tab>
            ))
          }
        </div>
      </TabList>
    </Tabs>
  )
}

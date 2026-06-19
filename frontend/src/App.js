import { useState } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <IntroScreen title="VECTORSHIFT" onEnter={() => setEntered(true)} />;
  }

  return (
    <div className="app-shell">
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;

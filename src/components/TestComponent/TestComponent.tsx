// TestComponent/TestComponent.tsx

import React, { useState } from 'react';
import { connect } from 'react-redux'; // Импорт connect
import { setData, clearData } from '../../actions/actionAbout';
import { RootState } from '../../store/store';

interface TestComponentProps {
  setData: (data: string) => void;
  clearData: () => void;
  data: string | null;
}

const TestComponent: React.FC<TestComponentProps> = ({
  setData,
  clearData,
  data,
}) => {
  const [text, setText] = useState<string>('');

  const handleSetData = () => {
    setData(text);
  };

  const handleClearData = () => {
    clearData();
    setText('');
  };

  return (
    <div>
      <h1>Данные из стейта: {data}</h1>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <button onClick={handleSetData}>Установить данные</button>
      <button onClick={handleClearData}>Очистить данные</button>
      <p>{text}</p>
      <p>{data}</p>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  data: state.data.data || null,
});

const mapDispatchToProps = {
  setData,
  clearData,
};

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);

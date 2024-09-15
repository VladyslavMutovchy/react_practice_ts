// TestComponent/TestComponent.tsx

import React, { useState } from 'react';
import { connect } from 'react-redux'; // Импорт connect
import { setData, clearData } from '../../store/storeAbout';
import { RootState } from '../../store/store';

interface TestComponentProps {
  setData: (data: string) => void;
  clearData: () => void;
  data: any | null;
}

const TestComponent: React.FC<TestComponentProps> = (props) => {
  const {
    setData,
    clearData,
    data,
  } = props;

  console.log('===data', data);

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
  data: state.storeAbout.data || null,
});

const mapDispatchToProps = {
  setData,
  clearData,
};

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);

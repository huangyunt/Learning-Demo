import KlineChart from './component/KlineChart';
import './App.css';

function App() {
  return (
    <div id="app-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>BTC/USDT K线图分析</h1>
      <KlineChart />
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
        数据来源: Binance | 展示最近100天的BTC/USDT价格走势
      </div>
    </div>
  );
}

export default App;

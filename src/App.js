import { useSelector } from "react-redux"
import Weather from './components/weather';

function App() {
  const theme = useSelector(state => state.theme)

  return (
    <div className={`app-container ${theme.currentTheme}`}>
      <Weather />
    </div>
  );
}

export default App;

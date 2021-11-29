import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useScoreCard } from '../hooks/useScoreCard';
// 
const SelectTab = () => {
  const { setTab, tabState } = useScoreCard();
  // newValue等於新點的tab
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tabState}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="add" label="add" />
        <Tab value="query" label="query" />
      </Tabs>
    </Box>
  );
}
export default SelectTab

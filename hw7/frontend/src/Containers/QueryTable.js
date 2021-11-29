import { DataGrid } from '@mui/x-data-grid';
import { useScoreCard } from '../hooks/useScoreCard';
const columns = [
  { field: 'id', headerName: 'ID', width: 70, hide:true },
  { field: 'name', headerName: 'NAME', width: 140 },
  { field: 'subject', headerName: 'SUBJECT', width: 140 },
  {
    field: 'score',
    headerName: 'SCORE',
    type: 'number',
    width: 110,
  }
];

// const rows = [
//   { id:0, name: 'amy', subject:'chinese', score:100},
//   { id:1, name: 'huan',subject:'english', score:95},
//   { id:2, name: 'huan',subject:'chinese', score:95},
// ];


const QueryTable = () => {
  const { tabState, addTable, queryTable} = useScoreCard();
  let tableContent = (tabState==='add'?addTable:queryTable)
  if (tableContent.length === 0){
    return (<div></div>)
  }
  for (let i=0; i<tableContent.length; i++){
    tableContent[i].id = i
  }
  return (
    <div style={{ height: 300, width: 400, marginRight:'0px', marginLeft:'auto'}}>
      <DataGrid
        rows={tableContent}
        columns={columns}
        pageSize={3}
        rowsPerPageOptions={[3]}
        headerAlign='left'
      />
    </div>
  );
}
export default QueryTable
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';
import SelectTab from './SelectTab';
import QueryTable from './QueryTable'
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { addMessages,
          queryMessages,
          addAddMessage,
          addAddErrorMessage, 
          addQueryMessage, 
          addQueryErrorMessage,
          tabState,
          updateAddTable
        } = useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    let {
      data: { message, card },
    } = await axios.post('/api/create-card', {
      name,
      subject,
      score,
    });
    // const message = "debug add"
    // const card = true
    if (!card) addAddErrorMessage(message)
    else addAddMessage(message);
    //advance: show all updated data
    createAddTable(name)
  };
  const createAddTable = async() =>{
    const queryType = 'name'
    const queryString = name
    const {
      data: { messages, message },
    } = await axios.get('/api/query-cards', {
      params: {
        type: queryType,
        queryString,
      },
    });
    updateAddTable(...messages)
    
  }

  const handleQuery = async () => {
    const {
      data: { messages, message },
    } = await axios.get('/api/query-cards', {
      params: {
        type: queryType,
        queryString,
      },
    });
    // const messages = ["debugging query"]
    // const message = true
    if (!messages) addQueryErrorMessage(message);
    else addQueryMessage(...messages);
  };

  return (
    <Wrapper>
      <Row>
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          onChange={handleChange(setSubject)}
        />
        <TextField
          className={classes.input}
          placeholder="Score"
          value={score}
          onChange={handleChange(setScore)}
          type="number"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !subject}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType}
              onChange={handleChange(setQueryType)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          placeholder="Query string..."
          value={queryString}
          onChange={handleChange(setQueryString)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString}
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row>
      <SelectTab/>
      <ContentPaper variant="outlined">
        <div style={{display:'flex',width:'100%'}}>
          <div >
            {(tabState==="add"?addMessages:queryMessages)
            .map((m, i) => (
              <Typography variant="body2" key={m + i} style={{ color: m.color }}>
                {m.message}
              </Typography>
            ))}
          </div>
          <QueryTable/>
        </div>
      </ContentPaper>
    </Wrapper>
  );
};

export default Body;

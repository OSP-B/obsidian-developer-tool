import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/mode';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/xq-light.css';

//component for graphQL query output data within playground
const QueryOutput = (props) => {
  const [output, setOutput] = useState(''); //need to pass in gql query results
  console.log('In QueryOutput');
  console.log(props.data);
  const editorStyle = {
    border: '1px outset',
    width: '50vw',
    fontSize: '14px',
    borderRadius: '10px',
  };

  useEffect(() => {
    setOutput(formatter(props.data,0));
  }, [props.data]);

  const formatter = (data,spaces) =>{
    let str = '';
    if(Array.isArray(data)){
      str += '[\n';
      spaces++;
      for( let i = 0; i < data.length; i++){
        str += ' '.repeat(spaces) + formatter(data[i],spaces + 1);
      }
      str += ' '.repeat(spaces) + ']\n';
    }
    else if(typeof data === 'object'){
      str += '{\n';
      spaces++;
      for(const key in data){
        str += ' '.repeat(spaces) + key + ' : ';
        str += formatter(data[key], spaces + 1);
      }
      str += ' '.repeat(spaces) + '}\n';
    } else {
      str +=  data + '\n';
    }
    return str;
  }

  return (
    <div className='queryOutput' style={editorStyle}>
      <div># GraphQL Query Results</div>
      <CodeMirror
        value={output}
        options={{
          theme: 'xq-light',
          lineNumbers: false,
          mode: 'json',
        }}
        onBeforeChange={(editor, data, value) => {
          setOutput(props.data.toString());
        }}
      />
    </div>
  );
};

export default QueryOutput;

import React, {useState, useEffect} from 'react'
import Log from './Log'

const Mutations = (props) => {
    const formatter = (data, spaces = 0) => {
		let str = '';
		if (Array.isArray(data)) {
			str += '[\n';
			spaces++;
			for (let i = 0; i < data.length; i++) {
				str += ' '.repeat(spaces) + formatter(data[i], spaces + 1);
			}
			str += ' '.repeat(spaces) + ']\n';
		} else if (typeof data === 'object') {
			str += '{\n';
			spaces++;
			for (const key in data) {
				str += ' '.repeat(spaces) + key + ' : ';
				str += formatter(data[key], spaces + 1);
			}
			str += ' '.repeat(spaces) + '}\n';
		} else {
			str += data + '\n';
		}
		return str;
	};

    const logs = [];
    for (let i=0; i<props.data.length; i++){
        logs.push(<Log key={`${i}.m`} name={`${i}. Mutation`} onClick={() => props.setGraphqlData(formatter(props.data[i].toString()))}/>)
    }

    return(
        <div>
            {logs}
        </div>
    )
}

export default Mutations
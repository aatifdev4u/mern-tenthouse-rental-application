import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchItems(props) {

    const [Searchterm, setSearchterm] = useState('');
    const onChangeSearch = (e)=>{
        setSearchterm(e.target.value);
        props.getSearchterm(e.target.value)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
                <Search
                    placeholder="Search..."
                    style={{width: '20%'}}
                    onChange={onChangeSearch}
                    value={Searchterm}
                />
            </div>
    )
}

export default SearchItems

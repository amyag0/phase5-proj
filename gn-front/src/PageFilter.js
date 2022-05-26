import React from 'react'

function PageFilter({setFilterType, filterActions}) {

    function onChangeType(synthEvent){
        filterActions(synthEvent)
        // setFilterType( synthEvent.target.value)
        // //filterActions()
        // console.log(synthEvent.target.value)
    }

    return (

        <div id="filter-bar">

            <div className="filter-fields">
                <select name="type" id="filter" className='filtering-stuff' onChange={onChangeType}>
                    <option value="all">All</option>
                    <option value="announcement">Announcement</option>
                    <option value="barter">Barter</option>
                    <option value="giveaway">Give Away</option>
                    <option value="sale">Sale</option>
                    <option value="tip">Tip</option>
                </select>
            </div>
        
        </div>

    )
}

export default PageFilter
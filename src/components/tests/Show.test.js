import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';


const show = {
    name:'test-name',
    summary:'test summary',
    seasons:[
        {id:1,name:'season1',episodes:[]},
        {id:2,name:'season2',episodes:[]},
        {id:3,name:'season3',episodes:[]}
    ]
}


test('renders without errors', ()=>{
    render(<Show show={show} selectedSeason={"none"}/>)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null}/>)

    const loadingMessage = screen.queryByTestId(/loading-container/i);
    
    expect(loadingMessage).toBeInTheDocument();
    expect(loadingMessage).toHaveTextContent("Fetching data...")
});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={show} selectedSeason={"none"}/>);

    const option = screen.queryAllByTestId(/season-option/i);
    
    expect(option).toHaveLength(3)
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn();
    render(<Show show={show} selectedSeason={"none"} handleSelect={handleSelect}/>);

    const seasons = screen.queryByLabelText(/Select A Season/i);
    userEvent.selectOptions(seasons,['1']);

    expect(handleSelect).toBeCalled();
    expect(handleSelect).toBeCalledTimes(1)
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    
    const { rerender } = render(<Show show={show} selectedSeason={"none"}/>);

    let episodes = screen.queryByTestId(/episodes-container/i);
    expect(episodes).not.toBeInTheDocument()

    rerender(<Show show={show} selectedSeason={1}/>);
    episodes = screen.queryByTestId(/episodes-container/i);
    expect(episodes).toBeInTheDocument()

});

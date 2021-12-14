import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';
import mockFetchShow from './../../api/fetchShow';

jest.mock('./../../api/fetchShow');

const testData = {
    name:'test-name',
    summary:'test summary',
    seasons:[
        {id:1,name:'season1',episodes:[]},
        {id:2,name:'season2',episodes:[]},
        {id:3,name:'season3',episodes:[]}
    ]
}

test('renders without errors with no props', ()=>{
    render(<Display/>)
});

test('renders Show component when the button is clicked ', async()=>{
    mockFetchShow.mockResolvedValueOnce(testData)
    render(<Display/>);
    
    const fetchButton = screen.queryByRole("button");
    userEvent.click(fetchButton);

    const show = await screen.findByTestId(/show-container/i)
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async()=>{
    mockFetchShow.mockResolvedValueOnce(testData);
    render(<Display/>);

    const fetchButton = screen.queryByRole('button');
    userEvent.click(fetchButton);

   await waitFor(()=> {
       const seasonOption = screen.queryAllByTestId(/season-option/i);
       expect(seasonOption).toHaveLength(3)
   })

    
});

test('optional function is called when the fetch button is clicked', async()=>{
    mockFetchShow.mockResolvedValueOnce(testData);
    const displayfunc = jest.fn();

    render(<Display displayFunc={displayfunc}/>);
    const fetchButton = screen.queryByRole('button');
    userEvent.click(fetchButton);
    
    await waitFor(()=> {
        expect(displayfunc).toBeCalledTimes(1);
    })
   
});

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testData = {
    id : 1,
    image : 'img',
    name: "episode",
    season: 1,
    number : 1,
    summary : 'this is an episode',
    runtime : 1
}
const ImgtestData = {
    id : 1,
    image : '',
    name: "episode",
    season: 1,
    number : 1,
    summary : 'this is an episode',
    runtime : 1
}
test("renders without error", () => {
    render(<Episode episode={testData}/> )
});

test("renders the summary test passed as prop", ()=>{
    //Arrange:render the component to the screen and pass summary as prop
    render(<Episode episode={testData}/>);

    //Act:query to get summary paragraph text
    const summary = screen.queryByText(/this is an episode/i);

    //Assert:expect specific summary text to be in the documents
    expect(summary).toBeInTheDocument();
    expect(summary).toHaveTextContent(/this is an episode/i);
    expect(summary).toBeTruthy();
});

test("renders default image when image is not defined", () =>{
    //Arrange:render the component with the image prop
    render(<Episode episode={ImgtestData}/>);

    //Act: query to get image element
    const image = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');
    
    //Assert: expect the image value to display a default value
    expect(image).toBeInTheDocument()
});

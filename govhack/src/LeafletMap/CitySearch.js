import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import DataHelper from '../Helpers/DataHelper';
import test from '../test';

class CitySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            options: {}
        }
    }

    componentDidMount(){

        test.testm();

        DataHelper.getSA2Data().then(
            (result) => {
                            this.setState({isLoaded: true, options: result}); 
                            console.log("Success!");
                        },
            //TODO implement error handling
            (error) =>  {
                            this.setState({isLoaded: false});
                            console.log("Failure");
                        }
        )
        
    }

    render() {
        // console.log(this.state.options);
            return (
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="cities"
                    // options={this.state.options}
                />
            );
        
    }
}
export default CitySearch
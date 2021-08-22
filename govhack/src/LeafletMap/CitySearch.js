import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import DataHelper from '../Helpers/DataHelper';

const StyledSelect = styled(Select)`
    width: 400px;
`;

class CitySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            options: {}
        }
    }

    handleChange = selectValue => {
        console.log(selectValue);
        this.props.onValueChange(selectValue);
    }

    componentDidMount(){
        DataHelper.getSA2Data().then(
            (result) => {
                            var cities = [];
                            var uniqueCities = [];
                            for (var obj in result){
                                if(!uniqueCities.includes(result[obj]['GCCSA_NAME_2016'])){
                                    uniqueCities.push(result[obj]['GCCSA_NAME_2016']);
                                    cities.push({value: result[obj]['SA2_MAINCODE_2016'], label: result[obj]['GCCSA_NAME_2016'], long: result[obj]['LNG'], lat: result[obj]['LAT']});
                                }
                            }

                            this.setState({isLoaded: true, options: cities}); 
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
                <StyledSelect
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="cities"
                    options={this.state.options}
                    onChange={this.handleChange}
                />
            );
        
    }
}
export default CitySearch
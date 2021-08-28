import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import FilterCity from '../Helpers/FILTER_CITY.json';

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
        this.props.onValueChange(selectValue);
    }

    componentDidMount() {
        var cities = [];
        for (var obj in FilterCity.cities){
            cities.push(FilterCity.cities[obj]);
        }
        this.setState({ isLoaded: true, options: cities });
    }

    render() {
        return (
            <StyledSelect
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={false}
                name="cities"
                options={this.state.options}
                onChange={this.handleChange}
            />
        );

    }
}
export default CitySearch
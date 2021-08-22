import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import DataHelper from '../Helpers/DataHelper';

const StyledSelect = styled(Select)`
    width: 400px;
`;

class FamilySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            options: [{ value: 1, label: "Couple-only" },
            { value: 2, label: "Couple with dependent children" },
            { value: 4, label: "Single" },
            { value: 5, label: "Sharing" },
            { value: 3, label: "Other" }]
        }
    }

    handleChange = selectValue => {
        console.log(selectValue);
        this.props.onValueChange(selectValue);
    }

    componentDidMount() {


    }

    render() {
        // console.log(this.state.options);
        return (
            <StyledSelect
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                name="age"
                options={this.state.options}
                onChange={this.handleChange}
            />
        );

    }
}
export default FamilySearch
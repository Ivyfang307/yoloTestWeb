import React, {Component} from 'react';
import './App.css';
import Header from './shared/components/Header';
import JobList from './shared/components/JobList/JobList'
import SearchIcon from "./assets/images/searchIcon.png";
import GridList from '@material-ui/core/GridList';
import {connect} from 'react-redux';

class App extends Component {

    constructor(props) {
        super(props);
        this.arrayholder = [];
    }

    componentDidMount() {
        return fetch('https://search.bossjob.com/api/v1/search/job_filter?size=10&query=system')
            .then((response) => response.json())
            .then((responseJson) => {
                this.props.setData(responseJson.data);

                //get first 12 jobs if the number of jobs is more than 12.

                if (responseJson.data.jobs.length > 12) {
                    var newJobs = responseJson.data.jobs.slice(0, 12);
                    this.props.setJobList(newJobs);
                    this.arrayholder = newJobs;
                } else {
                    this.props.setJobList(responseJson.data.jobs);
                    this.arrayholder = responseJson.data.jobs;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    searchFilterFunction = () => {
        const newData = this.arrayholder.filter(item => {
            const jobTitleData = `${item.job_title.toUpperCase()}`;
            const companyNameData = `${item.company_name.toUpperCase()}`;
            const textData = this.props.text.toUpperCase();

            //in filter function, if return ture, value will be added to the newData Array.

            if ((jobTitleData.indexOf(textData) > -1) || companyNameData.indexOf(textData) > -1) {
                return true;
            } else {
                return false;
            }
        });
        this.props.setJobList(newData);
    };

    render() {
        return (
            <div className="App">
                <div className="App-Wrapper">
                    <Header/>
                    <div className="SearchBar-Wrapper">
                        <div className="SearchBar">
                            <div className="SearchTextInput">
                                <img src={SearchIcon} alt="searchIcon" className="SearchIcon"/>
                                <input className="SearchInput"
                                       onChange={this.props.setText.bind(this)}
                                       value={this.props.text}
                                       placeholder={'Search for job title or company name'}/>
                            </div>
                            <button className="FilterButton"
                                    onClick={this.searchFilterFunction}>
                                Filter results
                            </button>
                        </div>

                    </div>
                    <div className="List-Wrapper">
                        <div className="Result">
                                {this.props.jobList ? this.props.jobList.length : 0}{' jobs found'}
                        </div>
                        <div className="JobList-Wrapper">
                            <GridList cellHeight={200}>
                                {this.props.jobList ? this.props.jobList.map(item => (
                                        <JobList
                                            job={item}/>
                                    ))
                                    : null}
                            </GridList>

                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        text: state.text,
        data: state.data,
        jobList: state.jobList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setText: (e) => dispatch({type: "SEARCH_TEXT", value: e.target.value}),
        setData: (data) => dispatch({type: "SET_DATA", value: data}),
        setJobList: (jobs) => dispatch({type: "SET_JOB_LIST", value: jobs})

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

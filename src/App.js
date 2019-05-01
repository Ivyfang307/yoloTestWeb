import React, { Component } from 'react';
import './App.css';
import {Button} from '@material-ui/core';
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

                console.log('job list '+JSON.stringify(this.props.jobList))

            })
            .catch((error) => {
                console.error(error);
            });
    }

    searchFilterFunction = () => {
        console.log('filter button clicked');
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
          <Header />

      <div style={{height: 140, width: '100%', backgroundColor: '#f5f5f5',}}>

    <div style={{display:'flex',flexDirection:'column',flex:1,padding: '10px 20px',justifyContent: 'center',
            alignItems: 'center',}}>

    <div className="SearchBar" style={{ borderBottomWidth: 1,
            borderBottomColor: '#d8d8d8',display:'flex',flexDirection:'row',height: 50, width: '100%', justifyContent: 'center',
            alignItems: 'center',marginBottom:20
        }}>
    <img src={SearchIcon} width="15" alt="searchIcon"
            style={{marginBottom:20,marginRight:5}}/>

            <input style={{
          width: '100%',
              backgroundColor:'transparent',
              height: 60,
              marginBottom: 20,
              borderWidth:0,
                outline:'none'

      }}
      onChange={this.props.setText.bind(this)}
      value={this.props.text}
      placeholder={'Search for job title or company name'}/>

            </div>

          <Button variant="outlined" color="primary"
      style={{
          display:'flex',
          flex:1,
          width: '100%',
              height: 30,
              borderWidth: 1,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center'
      }}
      onClick={this.searchFilterFunction}>
          Filter results
          </Button>
      </div>

          </div>
<div style={{ padding: '10px 20px',}}>
        <div
        className="SearchBar"
       style={{
           display:'flex',
            height: 40,
                width:'100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
        }}>
    <p style={{width: '80%', fontSize: 15, fontWeight: 'bold', color: '#000'}}>
        {this.props.jobList ? this.props.jobList.length : 0}{' jobs found'}

    </p>
        </div>
        <div style={{display:'flex',flex: 1, width: '100%'}}>
    <GridList cellHeight={200}>
        {this.props.jobList?this.props.jobList.map(item => (
            <JobList
            job={item}/>
        ))
    :null}
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
        text:state.text,
        data:state.data,
        jobList:state.jobList
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        setText:(e)=>dispatch({type:"SEARCH_TEXT",value:e.target.value}),
        setData:(data)=>dispatch({type:"SET_DATA",value:data}),
        setJobList:(jobs)=>dispatch({type:"SET_JOB_LIST",value:jobs})

    };
};


export default connect(mapStateToProps,mapDispatchToProps)(App);

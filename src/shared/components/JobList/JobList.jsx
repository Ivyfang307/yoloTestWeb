import React, { Component } from 'react';
import moment from 'moment';
import CompanyLogo from '../../../assets/images/companyLogo.jpg';
import MapIcon from '../../../assets/images/mapIcon.png';
import QualificationIcon from '../../../assets/images/qualificationIcon.png';
import WorkIcon from '../../../assets/images/workIcon.png';
import ClockIcon from '../../../assets/images/clockIcon.png';

class JobList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            job:props.job
        };
    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps){
            if(this.state.job !== this.props.job){
                console.log('different job  ');
                this.setState({job:this.props.job});
            }
        }

    }

    formatCurrency=(value)=>{
        var formattedValue=null;
        if(parseInt(value)>=1000){
            formattedValue=parseInt(value)/1000+'K';
        }
        else{
            formattedValue=value
        }
        return formattedValue;
    }

    render() {
        return (
            <div className="BottomLine" style={{display:'flex',flexDirection:'column',height:200,width:'100%',alignItems:'flex-start',justifyContent:'center',borderBottomWidth:1,borderBottomColor:'#d8d8d8'}}>
                <div style={{display:'flex',flexDirection:'row',justifyContent: 'center',flex:1,width:'100%',
                    alignItems: 'center'}}>
                    <p style={{fontSize:15,fontWeight: 'bold',color:'#000'}}>
                        {this.state.job.job_title}
                    </p>
                    <div style={{display:'flex',flex:1}}></div>
                    <p style={{fontSize:15,fontWeight: 'bold',color:'#000'}}>
                        {'SGD'+this.formatCurrency(this.state.job.salary_range_from )+' - SGD'+this.formatCurrency(this.state.job.salary_range_to)}
                    </p>
                </div>

                <div style={{display:'flex',justifyContent: 'center',flex:1,
                    alignItems: 'center',flexDirection:'row'}}>
                    <img
                        style={{width:20,height:20,marginRight:10,paddingBottom:5,resizeMode:'contain'}}
                        src={MapIcon}
                    />
                    <p style={{fontSize:12,color:'#000'}}>
                        {this.state.job.company_location}
                    </p>
                    <div style={{width:20}}></div>
                    <img
                        style={{width:20,height:20,marginRight:10,paddingBottom:5,resizeMode:'contain'}}
                        src={WorkIcon}
                    />
                    <p style={{fontSize:12,color:'#000'}}>
                        {this.state.job.xp_lvl}
                    </p>
                </div>

                <div style={{display:'flex',justifyContent: 'center',flex:1,
                    alignItems: 'center',flexDirection:'row'}}>
                    <img
                        style={{width:20,height:20,marginRight:10,paddingBottom:5,resizeMode:'contain'}}
                        src={QualificationIcon}
                    />
                    <p style={{fontSize:12,color:'#000'}}>
                        {this.state.job.degree}
                    </p>
                    <div style={{width:20}}></div>
                    <img
                        resizeMode={'contain'}
                        style={{width:10,height:10,marginRight:10,paddingBottom:5,resizeMode:'contain'}}
                        src={ClockIcon}
                    />
                    <p style={{fontSize:12,fontWeight: 'bold',color:'#000'}}>
                        {this.state.job.job_type}
                    </p>
                </div>

                <div style={{display:'flex',justifyContent: 'center',flex:1,
                    alignItems: 'center',flexDirection:'row'}}>
                    <img
                        style={{width:40,height:30,marginRight:20,paddingBottom:5,resizeMode:'contain'}}
                        src={CompanyLogo}
                    />
                    <div style={{width:180}}>
                        <p numberOfLines={2} ellipsizeMode={'tail'} style={{fontSize:12,color:'#000'}}>
                            {this.state.job.company_name}
                        </p>
                    </div>
                    <div style={{display:'flex',flex:1}}></div>
                    <p style={{fontSize:15,color:'grey'}}>
                        { moment(this.state.job.updated_at).fromNow()}
                    </p>
                </div>



            </div>
        );
    }
}

export default JobList;

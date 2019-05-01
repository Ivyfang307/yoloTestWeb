import React, {Component} from 'react';
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
            job: props.job
        };
    }

    componentDidUpdate(prevProps,prevState) {
        if (prevProps) {
            if (this.state.job !== this.props.job) {
                this.setState({job: this.props.job});
            }
        }
    }

    formatCurrency = (value) => {
        var formattedValue = null;
        if (parseInt(value) >= 1000) {
            formattedValue = parseInt(value) / 1000 + 'K';
        } else {
            formattedValue = value
        }
        return formattedValue;
    }

    render() {
        return (
            <div className="Job-Wrapper">
                <div className="JobTitle">
                    {this.state.job.job_title}
                    <div className="MaxSpace"></div>
                    {'SGD' + this.formatCurrency(this.state.job.salary_range_from) + ' - SGD' + this.formatCurrency(this.state.job.salary_range_to)}
                </div>

                <div className="JobLocation">
                    <img className="Icon"
                         src={MapIcon}
                         alt="MapIcon"
                    />
                    {this.state.job.company_location}
                    <div className="Space"></div>
                    <img className="Icon"
                         src={WorkIcon}
                         alt="WorkIcon"
                    />
                    {this.state.job.xp_lvl}
                </div>

                <div className="JobLocation">
                    <img className="Icon"
                         src={QualificationIcon}
                         alt="QualificationIcon"
                    />
                    {this.state.job.degree}
                    <div className="Space"></div>
                    <img className="ClockIcon"
                         src={ClockIcon}
                         alt="ClockIcon"
                    />
                    {this.state.job.job_type}
                </div>

                <div className="JobLocation">
                    <img
                        className="CompanyLogo"
                        src={CompanyLogo}
                        alt="CompanyLogo"
                    />
                    <div style={{width: 180}}>
                        <p numberoflines={2} ellipsizemode={'tail'}>
                            {this.state.job.company_name}
                        </p>
                    </div>
                    <div className="MaxSpace"></div>
                    <p style={{color: 'grey'}}>
                        {moment(this.state.job.updated_at).fromNow()}
                    </p>
                </div>

            </div>
        );
    }
}

export default JobList;

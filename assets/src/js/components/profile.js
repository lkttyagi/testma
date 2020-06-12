import  React ,{Component} from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import Select from 'react-select';
import {campaign,auth} from '../actions';
import './profile.css';



class Profile extends Component{
    constructor(props){
        super(props);
        
    };
    componentDidMount(){
             
        
    }
    feedback(campaignId){
        
        this.props.history.push({
            pathname:'/feedback',
            state:{
                id:campaignId,

            }
        })

    }
    render(){
        const { campaign: campaigns} = this.props;
        console.log(this.props.user);
        

          window.$(document).ready(function(){
                 window.$('.tabs').tabs();
                 window.$('select').formSelect();
                 M.updateTextFields();
                 window.$('.datepicker').datepicker();
                 window.$('.modal').modal();
          });


        return(
          <div>
          
<div id="main">
        <div className="row">
            <div className="content-wrapper-before gradient-45deg-indigo-purple"></div>
            <div className="breadcrumbs-dark pb-0 pt-4" id="breadcrumbs-wrapper">

                <div className="container">
                    <div className="row">
                        <div className="col s10 m6 l6">
                            <h5 className="breadcrumbs-title mt-0 mb-0">User Profile</h5>
                            <ol className="breadcrumbs mb-0">
                                <li className="breadcrumb-item"><a href="#">User</a>
                                </li>
                                <li className="breadcrumb-item active">Profile
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

            </div>

            <div className="col s12">
                <div className="container">


                          <div className="section users-edit">
                             <div className="card">
                                  <div className="card-content">

                                        <ul className="tabs mb-2 row">
                                          <li className="tab">
                                            <a className="display-flex align-items-center active" id="account-tab" href="#account">
                                                <i className="material-icons mr-1">person_outline</i><span>Account</span>
                                            </a>
                                          </li>
                                          <li className="tab">
                                            <a className="display-flex align-items-center" id="information-tab" href="#information">
                                                <i className="material-icons mr-2">description</i><span>Information</span>
                                            </a>
                                          </li>
                                        </ul>

                                        <div className="row">
                                          <div className="col s12" id="account">

                                            <div className="media display-flex align-items-center mb-2">
                                                <a className="mr-2" href="#">
                                                  <img src="../assets/images/avatar/avatar-1.png" alt="users avatar" className="z-depth-4 circle dropify-event" height="64" width="64"></img>
                                                </a>
                                                <div className="media-body">
                                                  <h5 className="media-heading mt-0">{this.props.user.username}</h5>
                                                  <div className="user-edit-btns display-flex">
                                                    <a href="#" className="btn-small indigo modal-trigger" href="#modal_password">Change Password</a>
                                                     <div id="modal_password" className="modal">
                                                       <form id="update_password">
                                                         <div className="modal-content">
                                                           <div className="row">
                                                             <h4 className="indigo-text">Change Password</h4>
                                                             <div className="input-field col s12">
                                                                <input id="old_password" type="password" className="validate"/>
                                                                <label for="old_password">Old Password</label>
                                                             </div>
                                                             <div className="input-field col s12">
                                                                <input id="new_password" type="password" className="validate"/>
                                                                <label for="new_password">New Password</label>
                                                             </div>
                                                             <div className="input-field col s12">
                                                                <input id="confirm_password" type="password" className="validate"/>
                                                                <label for="confirm_password">Confirm Password</label>
                                                             </div>
                                                           </div>
                                     </div>
                                 <div className="modal-footer">
                                                            <a href="#!" className="modal-close indigo btn">Cancel</a>
                                                            <a type="submit" className="btn indigo disabled">Submit</a>
                                                         </div>
                                                        </form>
                                                     </div>
                                                  </div>
                                                </div>
                                            </div>

                                            <form id="accountForm">
                                                <div className="row">
                                                  <div className="col s12 m6">
                                                    <div className="row">
                                                      <div className="col s12 input-field">
                                                        <input id="name" name="name" type="text" className="validate" defaultValue="Naresh Kumar" data-error=".errorTxt2" onChange={this.handleChange}></input>
                                                        <label for="name">Name</label>
                                                        <small className="errorTxt2"></small>
                                                      </div>
                                                      <div className="col s12 input-field">
                                                        <input id="email" name="email" type="email" className="validate" defaultValue="nareshkumarannepu@gmail.com" data-error=".errorTxt3"></input>
                                                        <label for="email">E-mail</label>
                                                        <small className="errorTxt3"></small>
                                                      </div>
                                                      <div className="col s12 input-field">
                                                        <input id="pan" name="pan" type="text" className="validate" data-error=".errorTxt2" deafultValue="" onChange={this.handleChange}></input>
                                                        <label for="name">PAN</label>
                                                        <small className="errorTxt2"></small>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="col s12 m6">
                                                    <div className="row">
                                                      <div className="col s12 input-field">
                                                        <select disabled>
                                                          <option selected>User</option>
                                                          <option>Staff</option>
                                                        </select>
                                                        <label>Role</label>
                                                      </div>
                                                      <div className="col s12 input-field">
                                                        <input id="phonenumber" type="tel" className="validate" defaultValue="(+656) 254 2568"></input>
                                                        <label for="phonenumber">Phone</label>
                                                      </div>
                                                      <div className="col s12 input-field">
                                                        <input id="company" name="company" type="text" className="validate"></input>
                                                        <label for="company">Company</label>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  
                                                  <div className="col s12 display-flex justify-content-end mt-3">
                                                    <button type="submit" className="btn indigo disabled">
                                                      Save changes</button>
                                                  </div>
                                                </div>
                                            </form>

                                          </div>
                                          <div className="col s12" id="information">

                                            <form id="infotabForm">
                                                <div className="row">
                                                  <div className="col s12 m6">
                                                    <div className="row">
                                                      <div className="col s12 input-field">
                                                        <input id="datepicker" name="datepicker" type="text" className="birthdate-picker datepicker" placeholder="Pick a birthday" data-error=".errorTxt4"></input>
                                                        <label for="datepicker">Birth date</label>
                                                        <small className="errorTxt4"></small>
                                                      </div>
                                                      <div className="col s12 input-field">
                                                        <select id="accountSelect" disabled>
                                                          <option>USA</option>
                                                          <option selected>India</option>
                                                          <option>Canada</option>
                                                        </select>
                                                        <label>Country</label>
                                                      </div>
                                                      <div className="col s12 input-field">
                                                        <input id="address" name="address" type="text" className="validate" data-error=".errorTxt5"></input>
                                                        <label for="address">Address</label>
                                                        <small className="errorTxt5"></small>
                                                      </div>
                                                      <div className="col s12 input-field">
                                                        <input id="websitelink" name="websitelink" type="text" className="validate"></input>
                                                        <label for="websitelink">Website</label>
                                                      </div>

                                                    </div>
                                                  </div>
                                                  <div className="col s12 m6">
                                                    <div className="row">

                                                      <div className="col s12 input-field">
                                                         <input className="validate" type="text" defaultValue="https://www.twitter.com/"></input>
                                                         <label>Twitter</label>
                                                      </div>
                                                      <div className="col s12 input-field">
                                                          <input className="validate" type="text" defaultValue="https://www.facebook.com/"></input>
                                                          <label>Facebook</label>
                                                      </div>
                                                      <div className="col s12 input-field">
                                                        <input id="linkedin" name="linkedin" className="validate" type="text"></input>
                                                        <label for="linkedin">LinkedIn</label>
                                                      </div>
                                                      <div className="col s12 input-field">
                                                          <input className="validate" type="text" defaultValue="https://www.instagram.com/"></input>
                                                          <label>Instagram</label>
                                                      </div>
                                                    </div>
                                                  </div>


                                                  <div className="col s12 display-flex justify-content-end mt-1">
                                                    <button type="submit" className="btn indigo disabled">
                                                      Save changes</button>
                                                  </div>
                                                </div>
                                            </form>

                                          </div>
                                        </div>

                                 </div>
                            </div>
                        </div>



                </div>
            </div>

        </div>
</div>
</div>
            )
    }
}
const mapStateToProps = state =>{
    return{
        campaign:state.campaign,
        user:state.auth.user,
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        fetchCampaigns:()=>{
            dispatch(campaign.getCampaigns());

        }
    }
    
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);

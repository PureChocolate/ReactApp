import React, { useState } from 'react';
import './Account.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Account = () => {
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [email, setEmail] = useState("name@gmail.com");
    const [phoneNumber, setPhoneNumber] = useState("+360 555 5555");
    const [company, setCompany] = useState("Apple Amazon");
    const [designation, setDesignation] = useState("UI Developer");
    const [bio, setBio] = useState(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    );
    return (
        <>
            <div className="container">
                <div className="userCard cardWidth">
                    <div className="profile-tab-nav border-right">
                        <div className="pp-4">
                            <div className="img-circle text-center mb-3">
                                <AccountCircleIcon sx={{
                                    fontSize: "120px"
                                }} />
                            </div>
                            <h4 className="text-center">John Doe</h4>
                        </div>
                        <div className="social">
                            <ul>
                                <li>
                                    <i className="fa">
                                        <FacebookIcon />
                                    </i>
                                    <i className="fa">
                                        <LinkedInIcon />
                                    </i>
                                    <i className="fa">
                                        <InstagramIcon />
                                    </i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content pp-4 p-md-5" id="v-pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="account"
                            role="tabpanel"
                            aria-labelledby="account-tab"
                        >
                            <h3 className="myb-3 h3">Account Settings</h3>
                            <div className="cardRow">
                                <div className="cardRow-md">
                                    <div className="form-gp">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            className="form-cont"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="cardRow-md">
                                    <div className="form-gp">
                                        <label>Last Name</label>
                                        <input type="text" className="form-cont" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="cardRow-md">
                                    <div className="form-gp">
                                        <label>Email</label>
                                        <input type="text" className="form-cont" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="cardRow-md">
                                    <div className="form-gp">
                                        <label>Phone number</label>
                                        <input type="text" className="form-cont" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                </div>
                                <div className="cardRow-md">
                                    <div className="form-gp">
                                        <label>Company</label>
                                        <input type="text" className="form-cont" value={company} onChange={(e) => setCompany(e.target.value)} />
                                    </div>
                                </div>
                                <div className="cardRow-md">
                                    <div className="form-gp">
                                        <label>Designation</label>
                                        <input type="text" className="form-cont" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="cardRow-md-12">
                                <div className="form-gp">
                                    <label>Bio</label>
                                    <textarea className="form-cont" rows="4" value={bio} onChange={(e) => setBio(e.target.value)} ></textarea>
                                </div>
                            </div>
                            <div className='cta-flex'>
                                <button className="cta-b">Update</button>
                                <button className="cta-c">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Account;
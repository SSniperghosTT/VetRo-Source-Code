
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './ContextProvider';
import { UseFirebaseAuth } from './UseFirebaseAuth'
import { Link } from 'react-router-dom'
import { collection, doc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons'
import * as faReg from '@fortawesome/free-regular-svg-icons'
import shoes from '../images/shoes.jpg'


export default function DoctorProfile() {


    const { signOutUser } = UseFirebaseAuth();
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const [isOpen, setIsOpen] = useState(false)




    /*For Clinic data */
    const [clinicData, setClinicData] = useState([]);
    const usersRef = doc(db, "Users", userObj.uid);
    const fetchClinicData = async () => {
        try {
            const response = collection(db, 'Clinics');
            const q = query(response, where("DoctorId", "==", usersRef.id)); // Assuming userId property in Clinics collection
            const data = await getDocs(q);
            const clinicDataArray = data.docs.map(doc => doc.data());
            setClinicData(clinicDataArray);
        } catch (error) {
            console.error("Error fetching clinic data:", error);
        }
    };

    const HandleInfoUpdate = async (event) => {
        let newUserInfo = {
            DoctorName: event.target[0].value,
            phoneNumber: event.target[1].value,
            About: event.target[2].value
        }
        await updateDoc(usersRef, newUserInfo)
        setIsOpen(false)
        window.location.reload();
    }
    useEffect(() => {
        console.log("Doctor Profile updated");
        fetchClinicData();
    }, [usersRef.id]);


    return (

        <div className="card w-100 p-3 mt-2 myBottomMargin">
            <div className='container'>
                <div className="row">
                    {isOpen ? (
                        <div className='myOverlay d-flex justify-content-center align-items-center'>
                            <div className='container bg-light rounded-5 w-100'>
                                <div className="row text-center">
                                    <div className="col-12 d-flex justify-content-between">
                                        <p className='px-3'></p>
                                        <h2 className='py-3'><b>Edit Info</b></h2>
                                        <div className='d-flex justify-content-end align-items-center'>
                                            <FontAwesomeIcon onClick={() => setIsOpen(false)} className='myClose' icon={fa.faCircleXmark} />
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                                <form onSubmit={HandleInfoUpdate}>
                                    <div className='container' style={{ fontSize: '1.25rem', fontStyle: 'italic', fontFamily: 'arial' }}>
                                        <div className='row py-2 align-items-center'>
                                            <div className='col-sm-2'><span className=''>Name:</span></div>
                                            <div className='col-sm-10'><input className='form-control' type='text' defaultValue={UserDBData.DoctorName} /></div>
                                        </div>
                                        <div className='row py-2 align-items-center'>
                                            <div className='col-sm-2'><span className=''>Phone:</span></div>
                                            <div className='col-sm-10'><input className='form-control' type='tel' defaultValue={UserDBData.phoneNumber} /></div>
                                        </div>
                                        <div className='row py-2 pb-2 align-items-center'>
                                            <div className='col-sm-2'><span className=''>Bio:</span></div>
                                            <div className='col-sm-10'><textarea className='form-control' defaultValue={UserDBData.About} style={{ resize: 'none' }} rows='4' /></div>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <button type='submit' className="btn btn-outline-success w-25 py-3 m-3">submit</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>

                    ) : (
                        <></>
                    )
                    }
                    {
                        // clinicData.map((clinic, index) => (
                        //     <div key={index}>
                        //         <p><b>Name:</b> {clinic.name}</p>
                        //         <p><b>Phone:</b> {clinic.phone}</p>
                        //         <p><b>Location:</b> {clinic.location}</p>
                        //         <p><b>Price:</b> {clinic.price}</p>
                        //         <p><b>Day:</b> {clinic.Day}</p>
                        //         <p><b>Available From:</b> {clinic.availableFrom}</p>
                        //         <p><b>Available To:</b> {clinic.availableTo}</p>
                        //     </div>
                        // ))
                    }

                    {/* <div style={{ border: "#fff" }} className="card w-100 p-3 my-5">
                <div className='container'>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="box-shadow-full">
                                <div className="row">
                                    <div className="col-md-5 wow BounceInLeft" data-wow-offset={200} style={{ visibility: 'visible', animationName: 'bounceInLeft' }}>
                                        <div className="row">
                                            <div className="col-sm-6 col-md-5 About ">
                                                <div>
                                                    <img id="img" src={UserDBData.userPFP} className="img-fluid rounded b-shadow-a w-100" />
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-md-7 About">
                                                <div className="about-info my-2">
                                                    <p><span style={{ fontWeight: 'bolder' }} className="title-s">Doctor Name: </span> <span>{UserDBData.DoctorName}</span></p>

                                                    <p className="lol"><span style={{ fontWeight: 'bolder' }} className="title-s">Email: </span>
                                                        <a href="mailto: noureldin2662002@gmail.com">{userObj.email}</a>
                                                    </p>
                                                    <p><span style={{ fontWeight: 'bolder' }} className="title-s">Phone: </span> <a href="tel:+201116074576">{UserDBData.phoneNumber}</a></p>
                                                </div>
                                                <div>
                                                    <button onClick={() => setIsOpen(true)} className='btn btn-danger'>Edit Info</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="skill-mf my-2 wow bounceInUp" data-wow-offset={150} style={{ visibility: 'visible', animationName: 'bounceInUp' }}> */}
                    {/*display data of clinics*/}
                    {/* <h4>Clinic Details:</h4>


                                        </div>
                                    </div>
                                    <div className="col-md-1" />
                                    <div className="col-md-6 wow BounceInRight" data-wow-offset={200} style={{ visibility: 'visible', animationName: 'bounceInRight' }}>
                                        <div className="about-me pt-4 pt-md-0">
                                            <div className="title-box-2">
                                                <h5 className="title-left lul-title">
                                                    About me
                                                </h5>
                                            </div> */}

                    {/* {UserDBData.About} */}
                    {/* {UserDBData.About ? (
                                                <p className="lead" >{UserDBData.About}</p>
                                            ) : (
                                                <p className='lead'>This is your about 😎</p>
                                            )} */}
                    {/* <div className="title-box-2">
                                                <h5 className="title-left lul-title">
                                                    Pets
                                                </h5>
                                            </div>
                                            <div>
                                                <Link className="btn btn-info my-2" to="Clinic">Add Clinic</Link>

                                            </div>
                                            <button id="cvBtn" className="btn btn-warning text-light MyOrangeBg w-100">Download CV</button>
                                            <button onClick={signOutUser} className="btn btn-warning text-light MyOrangeBg w-100 mt-4">Sign Out</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div> */}


                    <div className='position-relative'>
                        <button onClick={signOutUser} className="btn btn-outline-danger position-absolute mySignOut z-3">Sign Out</button>

                        <div className='display row'>
                            <div className="card text-center align-items-center w-100 bg-white py-4 rounded shadow">
                                <div className="row"  >
                                    <div className=""><img src={UserDBData.userPFP} className="avatar circle-round" />
                                        <h4>Dr.{UserDBData.DoctorName}</h4>
                                        <div className="about-info d-flex justify-content-center">
                                            {/* <div className="py-1 " ><a className='mail' href={`mailto: ${userObj.email}`}>{userObj.email}</a></div> */}
                                            <div className='text-warning pe-2'>
                                                <FontAwesomeIcon className='' icon={faReg.faStar} />
                                                <FontAwesomeIcon className='' icon={faReg.faStar} />
                                                <FontAwesomeIcon className='' icon={faReg.faStar} />
                                                <FontAwesomeIcon className='' icon={faReg.faStar} />
                                                <FontAwesomeIcon className='' icon={faReg.faStar} />
                                            </div>
                                                <p className='text-secondary'>4.5 (1500 reviews)</p>
                                        </div>
                                            <div id='about' className='w-100 text-center d-flex justify-content-center'>
                                                <p className='w-50 text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur deleniti est, animi vero dolores temporibus sint cumque et quae alias.</p>
                                            </div>
                                        <div className=" py-1">
                                            <FontAwesomeIcon onClick={() => setIsOpen(true)} className='btn btn-outline-primary p-2 mb-2' icon={fa.faPenToSquare} />

                                        </div>
                                        <hr className='w-100' />
                                        <div>
                                            <h4>
                                                Your Clinics
                                            </h4>
                                        </div>
                                    </div>

                                    <div className='row justify-content-center'>
                                        {
                                            clinicData.map((clinic, index) => (
                                                <div key={index} onClick={() => console.log(clinic)} className="col-4 col-sm-4 col-md-4 col-lg-4 ">
                                                    {
                                                        clinic.image ? (
                                                            <img src={clinic.image} className="profile-pic pointer" />
                                                        ) : (
                                                            <img src={shoes} className="profile-pic pointer" />
                                                        )
                                                    }
                                                </div>

                                            ))
                                        }

                                        <div className='col-4 col-sm-4 col-md-4 col-lg-4'>
                                            <Link className="" to="clinic">
                                                <button className='btn btn-outline-primary pet-add'>
                                                    <FontAwesomeIcon className='' icon={fa.faAdd} />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="card w-100 bg-white rounded shadow pt-3 mt-3">
                                <div className='text-center'><h3 >Clinic Profile</h3></div>
                                <div className='d-flex justify-content-center'>
                                    <div className='w-100 rounded-4 p-4 my-2 mb-4 row justify-content-center'>
                                        <div className='col-md-5 align-items-center d-flex'>
                                            <div className=''>
                                                <img src={clinicData[0]?.image} className="pet-pic2" />
                                            </div>
                                            <div className=' ps-3'>
                                                <div className=" align-items-center d-flex" >
                                                    <p className='mb-0 me-3'>{clinicData[0]?.name}</p>
                                                    <FontAwesomeIcon className='btn btn-outline-primary p-2' icon={fa.faPenToSquare} />
                                                </div>
                                                {clinicData ? (
                                                    <>
                                                        <p className='m-0'>Booking price: {clinicData[0]?.price} L.E</p>
                                                        <p className='m-0'>Clinic phone number: {clinicData[0]?.phone}</p></>
                                                ) : (<></>)
                                                }
                                            </div>
                                        </div>
                                        <div className='col-md-7 '>
                                            <div className='w-100 MyLeftBorder'>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className='mb-0 text-secondary'>Clinic Name</h6>
                                                    <span className='me-5 title'>{clinicData[0]?.name}</span>
                                                </div>
                                                <hr className='my-2' />
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className='mb-0 text-secondary'>Clinic phone number</h6>
                                                    <span className='me-5 title'>{clinicData[0]?.phone}</span>
                                                </div>
                                                <hr className='my-2' />
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className='mb-0 text-secondary'>Booking price</h6>
                                                    <span className='me-5 title'>{clinicData[0]?.price}</span>
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
        </div>
    )
}
// samy was here


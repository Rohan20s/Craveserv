import style from './header.module.css'
import logo from '../../../Assests/logo.avif'
import bg from '../../../Assests/bg.avif'
// import useCustomHookTest from '../../../Store/Features/CustomHookTest'
import { useMemo, useState } from 'react'
// import { type } from 'os'
import { BiUserCircle } from "react-icons/bi"
// import { FiSearch } from "react-icons/fi"
import LocationInput from './LocationInput'
import Searchinput from './SearchInput'
// import { firebase, ui } from "../../../Firebase"
import Login from '../../Auth/Login'
import Registration from '../../Auth/Registration'
import Verification from '../../Auth/Verification'
import EmailLogin from '../../Auth/EmailLogin'





const Header = () => {

    const [isLoginVisible, setLoginVisiblity] = useState(false)
    const [isSingUpVisible, setSignUpVisible] = useState(false)
    const [isEmailVisible, setEmailLoginVisiblity] = useState(false)
    const [isVerificationOpen, setVerificationVisiblity] = useState(false)
    const [data, setData] = useState({})

    console.log("login")

    // var uiConfig = {
    //     callbacks: {
    //         signInSuccessWithAuthResult: function (authResult: any, redirectUrl: any) {
    //             // User successfully signed in.
    //             // Return type determines whether we continue the redirect automatically
    //             // or whether we leave that to developer to handle.
    //             window.location.href=""
    //             return true;
    //         },

    //         uiShown: function () {
    //             // The widget is rendered.
    //             // Hide the loader.
    //             var obj = document.getElementById('loader')
    //             if (obj)
    //                 obj.style.display = 'none';
    //         }
    //     },
    //     signInFlow: 'popup',
    //     signInSuccessUrl: 'www.google.com',
    //     signInOptions: [
    //         {
    //             provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //             signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    //             // Allow the user the ability to complete sign-in cross device,
    //             // including the mobile apps specified in the ActionCodeSettings
    //             // object below.
    //             forceSameDevice: false,
    //             // Used to define the optional firebase.auth.ActionCodeSettings if
    //             // additional state needs to be passed along request and whether to open
    //             // the link in a mobile app if it is installed.

    //             emailLinkSignIn: function () {
    //                 return {
    //                     // Additional state showPromo=1234 can be retrieved from URL on
    //                     // sign-in completion in signInSuccess callback by checking
    //                     // window.location.href.
    //                     url: 'https://www.example.com/completeSignIn?showPromo=1234',
    //                     // Custom FDL domain.
    //                     dynamicLinkDomain: 'example.page.link',
    //                     // Always true for email link sign-in.
    //                     handleCodeInApp: true,
    //                     // Whether to handle link in iOS app if installed.
    //                     iOS: {
    //                         bundleId: 'com.example.ios'
    //                     },
    //                     // Whether to handle link in Android app if opened in an Android
    //                     // device.
    //                     android: {
    //                         packageName: 'com.example.android',
    //                         installApp: true,
    //                         minimumVersion: '12'
    //                     }
    //                 };
    //             }
    //         },
    //         firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //         firebase.auth.GoogleAuthProvider.PROVIDER_ID
    //     ],


    // }

    // ui.start('#firebaseui-auth-container', uiConfig);

    // const thread = useRef<{ value: ReturnType<typeof setTimeout> } | null>(null)
    // const [inputAddress, setInputAddress] = useState<string>("")
    // const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     console.log(data,places)
    // }, [data,places])



    return (
        <div className={style.heading}>

            <div className={style.bgContainer}>
                <img src={bg} alt="" className={style.bg} />
            </div>

            <div className={style.UpperContent}>
                <div className={style.navbar}>
                    <div className={style.iconbar}>
                        <BiUserCircle className={style.userIcon} />
                    </div>
                    <ul className={style.menuList}>
                        <li>Home</li>
                        <li>Add Restaurant</li>
                        {!sessionStorage.getItem("token") ?
                            <li onClick={e => setLoginVisiblity(true)}>Log in</li>
                            : <li >Profile</li>}
                        {!sessionStorage.getItem("token") ?
                            <li onClick={e => setSignUpVisible(true)}>Sign Up</li> :
                            <li >Favourite</li>}
                    </ul>
                </div>

                <img src={logo} alt="" className={style.zomatoLogo} />

                <div className={style.subText}>Discover the best food & drinks in Balasore</div>
                {/* <div id="firebaseui-auth-container"></div>
                <div id="loader">Loading...</div> */}
                <div className={style.inputContainer}
                // onChange={e => {
                //     setLoading(true)
                //     if (thread.current != null) {
                //         clearTimeout(thread.current.value)
                //         thread.current.value = setTimeout(() => {
                //             setInputAddress(e.target.value)
                //             setLoading(false)
                //         }, 2000)
                //     }
                // }}
                >
                    <div className={style.locationInputContainer}>
                        {useMemo(() => <LocationInput />, [])}
                    </div>
                    <div className={style.searchInputContainer}>
                        {useMemo(() => <Searchinput />, [])}
                    </div>
                </div>
            </div>

            {isLoginVisible ?
                <Login
                    setLoginVisiblity={setLoginVisiblity}
                    setSignUpVisible={setSignUpVisible}
                    setEmailLoginVisiblity={setEmailLoginVisiblity}
                    setVerificationVisiblity={setVerificationVisiblity}
                    setData={setData}
                />
                : null}


            {isSingUpVisible ?
                <Registration 
                setSignUpVisible={setSignUpVisible} 
                setData={setData} 
                setVerificationVisiblity={setVerificationVisiblity}
                setLoginVisiblity={setLoginVisiblity}/> : null
            }

            {isVerificationOpen?
            <Verification setVerificationVisiblity={setVerificationVisiblity} data={data}/>:null    }
            
            {isEmailVisible?
            <EmailLogin 
            setEmailLoginVisiblity={setEmailLoginVisiblity} 
            setData={setData} 
            setSignUpVisible={setSignUpVisible} 
            setVerificationVisiblity={setVerificationVisiblity}
            />:null}


        </div>
    )
}

export default Header
import style from "../landing.module.css"
import { AiOutlineGoogle } from 'react-icons/ai'
import 'react-phone-input-2/lib/style.css'
import { useSelector } from "react-redux"
import { RootState } from '../../../Store/index';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from "../../../Firebase";
import { useEffect, useState } from "react";
import { LoginWithEmail } from "../../../Api/AuthServices";
import { useDispatch } from "react-redux";
import { updateUserData } from "../../../Store/SliceActions";


declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
    }
}

const Otp = ({ setAction, action,setAuthVisiblity }: { setAction: (value: any) => void, action: any,setAuthVisiblity:(value:boolean)=>void }) => {


    const { appData } = useSelector((state: RootState) => state)

    const [hasFilled, setHasFilled] = useState<any>(false);
    const [otp, setOtp] = useState<string>("")
    const dispatch=useDispatch()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const input = document.getElementById("otp")


    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
            'size': 'invisible',
            'callback': (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
            }
        });
    }

    const numberLogin = (phone: string) => {
        setHasFilled(true);
        generateRecaptcha();

        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phone, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
            }).catch((error) => {
                // Error; SMS not sent
                console.log(error);
            });
    }

    const verifyOtp = () => {

        if (otp.length === 6) {
            // verifu otp
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then((result: any) => {
                // User signed in successfully.
                
                if (action.data.method == "Registration") {
                
                }
                else if( action.data.method == "Phone_login"){
                    
                }

            }).catch((error: any) => {
               
                alert('User couldn\'t sign in (bad verification code?)');
            });
        }
    }


    async function emailLogin() {

        await LoginWithEmail({ email: action.data.email, otp: otp }).then((data) => {
            console.log(data)
            if (data.error) {
                setError(data.error)
                setLoading(false)
                if (input)
                    input.style.borderColor = "red";

            }
            else
             {
                setLoading(false);
                sessionStorage.setItem("token",data)
                setAuthVisiblity(false)
                dispatch(updateUserData(data.user))
                window.location.reload()
             }
        })
    }


    async function verifyOtpMethod() {
        if (action.data.method == "Registration") {
            verifyOtp()
        }
        else if (action.data.method == "Email_login") {
            emailLogin()
        }
        else if( action.data.method == "Phone_login"){
            verifyOtp()
        }
    }


    useEffect(() => {

        if (action.data.method == "Registration" || action.data.method == "Phone_login") {
            console.log("action", action)
            generateRecaptcha()
            numberLogin(action.data.phone)
        }


        console.log(action)
    }, [])



    return (
        <>
            {action.data.method == "Registration" || action.data.method == "Phone_login" ? <div className={style.hide} id="recaptcha"></div> : null}

            <div className={style.conformationText}>You recieved your OTP on </div>
            <div className={style.conformationHighlight}>+91 6264170187</div>

            <input className={style.inputContainer}
                placeholder='Enter one time password here'
                id="otp"
                style={{ padding: "0 10px", width: "96%" }}
                type="number"
                onChange={e => {
                    setError("");
                    setOtp(e.target.value);
                    if (input)
                        input.style.borderColor = "#9c9c9c";
                }} />

                <span className={style.errorText}>{error}</span>

            <button className={style.otpBtn}>
                <span className={style.btnText} onClick={e => { e.preventDefault(); verifyOtpMethod() }}>Submit OTP</span>
            </button>

            <span className={style.orText}>
                <hr className={style.line} style={{ zIndex: "0" }} />
                <span style={{ background: "white", zIndex: "1", width: "40px", textAlign: "center" }}>or</span>
            </span>

            <span className={style.registertext}>Haven't recieve otp yet ?<span className={style.registerLink} > Resend </span></span>
        </>
    )
}

export default Otp
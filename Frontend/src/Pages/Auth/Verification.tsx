import { useEffect, useState } from "react"
import style from "./landing.module.css"
import { AiOutlineGoogle, AiOutlineClose } from 'react-icons/ai'
import { LoginWithEmail, LoginWithNumber, saveNewUser } from "../../Api/AuthServices"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import { useDispatch } from "react-redux"
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { updateUserData } from "../../Store/SliceActions"
import { auth } from "../../Firebase"
import { json } from "stream/consumers"


const Verification = ({ setVerificationVisiblity, data }: { setVerificationVisiblity: (value: boolean) => void, data: any }) => {
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
                console.log("sended")
            }).catch((error) => {
                // Error; SMS not sent
                setError("Sorry! We are facing some issue please login with email")
                setLoading(false)
                if (input)
                    input.style.borderColor = "red";
            });
    }

    const verifyOtp = () => {
        setLoading(true)
        if (otp.length === 6) {
            // verifu otp
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then((result: any) => {
                // User signed in successfully.
                
                if (data.method == "Registration") {
                    createUser()
                }
                else if( data.method == "Phone_login"){
                    NumberLogin()
                }

            }).catch((error: any) => {
                setError("Something went wrong! Please retry")
                setLoading(false)
                if (input)
                    input.style.borderColor = "red";
                // alert('User couldn\'t sign in (bad verification code?)');
            });
        }
    }


    async function emailLogin() {

        await LoginWithEmail({ email:data.email, otp: otp }).then((data) => {
            console.log(data)
            if (data.error) {
                setError(data.error)
                setLoading(false)
                if (input)
                    input.style.borderColor = "red";

            }
            else if(data.token)
             {
                setLoading(false);
                sessionStorage.setItem("token",data.token)
                 setVerificationVisiblity(false)
                dispatch(updateUserData(data.user))
                // window.location.reload()
             }
             else {
                window.location.reload()
             }
        })
    }

    
    async function NumberLogin(){
        setLoading(true);

      await LoginWithNumber({phone:data.phone}).then(data=>{
        if(data.error){
           setError(data.error)
           if (input)
                    input.style.borderColor = "red";
        }
        else if(data.token){
            setLoading(false);
            sessionStorage.setItem("token",data.token)
            setVerificationVisiblity(false)
            dispatch(updateUserData(data.user))
            window.location.reload()
        }
        else{
            window.location.reload()
        }
      })
    }

    async function createUser(){
       await saveNewUser(data).then(data=>{
        if(data.error){
            setError(data.error)
            if (input)
                     input.style.borderColor = "red";
         }
         else if(data.token){
             setLoading(false);
             sessionStorage.setItem("token",data.token)
             setVerificationVisiblity(false)
             dispatch(updateUserData(data.user))
             window.location.reload()
         }
         else {
            window.location.reload()
         }
       })
    }



    async function verifyOtpMethod() {
        if (data.method == "Registration") {
            verifyOtp()
        }
        else if (data.method == "Email_login") {
            emailLogin()
        }
        else if( data.method == "Phone_login"){
            verifyOtp()
        }
    }


    useEffect(() => {

        if (data.method == "Registration" || data.method == "Phone_login") {
            console.log("data", data)
            generateRecaptcha()
            numberLogin(data.phone)
        }


    }, [])


    return (
        <>
            <form className={style.formContainer} >

                <header className={style.header}>
                    <h4 className={style.subHeading}>OTP Verification</h4>
                    <AiOutlineClose className={style.closeIcon} />
                </header>

                {data.method == "Registration" || data.method == "Phone_login" ? <div className={style.hide} id="recaptcha"></div> : null}

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
            </form>
            <div className={style.absoluteScreen} onClick={e => setVerificationVisiblity(false)}>
            </div>
        </>
    )
}

export default Verification
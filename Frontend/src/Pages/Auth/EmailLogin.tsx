import style from "./landing.module.css"
import { AiOutlineClose, AiOutlineGoogle } from 'react-icons/ai'
import { useSelector } from "react-redux"
import { RootState } from '../../Store/index';
import { verifyEmail } from "../../Api/AuthServices";
import { useState } from "react";
import "../../Sass.scss"


const EmailLogin = ({
    setEmailLoginVisiblity,setData,setSignUpVisible,setVerificationVisiblity
}:{
    setEmailLoginVisiblity:(value:boolean)=>void,
    setData:(value:any)=>void,
    setSignUpVisible:(value:boolean)=>void,
    setVerificationVisiblity:(value:boolean)=>void
}

) => {

    const { appData } = useSelector((state: RootState) => state)

    const [email, setEmail] = useState<string>("")

    const [error, setError] = useState("")

    const [loading, setLoading] = useState(false)
    const input = document.getElementById("email")

    async function SubmitDetail() {

        setLoading(true)
        await verifyEmail({ email: email }).then((data: any) => {
            if (data.error) {
                setError(data.error)
                setLoading(false)
                if (input)
                    input.style.borderColor = "red";

            }
            else if(data.message) {
                setLoading(false)
                const response = {
                    method: "Email_login",
                    email: email,
                }
                setData(response)
                setEmailLoginVisiblity(false)
                setVerificationVisiblity(true)
            }
            else {
                setError("Something went wrong ! Please try again later")
                setLoading(false)
                if (input)
                    input.style.borderColor = "red";
            }
        })
    }



  return (
    <>
      <form className={style.formContainer} >

        <header className={style.header}>
          <h4 className={style.subHeading}>Email Login</h4>
          <AiOutlineClose className={style.closeIcon} onClick={e => {setEmailLoginVisiblity(false)}} />
        </header>

        <input className={style.inputContainer} id="email"
                placeholder='Enter your email'
                style={{ padding: "0 10px", width: "96%" }}
                onChange={e => {
                    setError("");
                    setEmail(e.target.value);
                    if (input)
                        input.style.borderColor = "#9c9c9c";
                }} />

            <span className={style.errorText}>{error}</span>

            <button className={style.otpBtn} onClick={e => { e.preventDefault(); SubmitDetail() }}>
                {loading ?
                    <span className={style.btnText}> <div className="loader">
                        <span className="circle"></span>
                        <span className="circle"></span>
                        <span className="circle"></span>
                        <span className="circle"></span>
                    </div></span>
                    : <span className={style.btnText}>Send verification code</span>}
            </button>

            <span className={style.orText}>
                <hr className={style.line} style={{ zIndex: "0" }} />
                <span style={{ background: "white", zIndex: "1", width: "40px", textAlign: "center" }}>or</span>
            </span>

            <button className={style.optionBtn}>
                <AiOutlineGoogle className={style.optionIcon} />
                <span className={style.optionText}>Continue with Google</span>
            </button>

            <span className={style.registertext}>New to {appData.company}?<span className={style.registerLink} onClick={e => { e.preventDefault(); setSignUpVisible(true); setEmailLoginVisiblity(false) }}> Login</span></span>

      </form>
      <div className={style.absoluteScreen} onClick={e => {setEmailLoginVisiblity(false)}}>
      </div>
    </>

  )
}

export default EmailLogin
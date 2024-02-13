import style from "../landing.module.css"
import { AiOutlineGoogle } from 'react-icons/ai'
import 'react-phone-input-2/lib/style.css'
import { useSelector } from "react-redux"
import { RootState } from '../../../Store/index';
import { verifyEmail } from "../../../Api/AuthServices";
import { useState } from "react";
import "../../../Sass.scss"

const EmailLogin = ({ setAction }: { setAction: (value: any) => void }) => {

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
            else {
                setLoading(false)
                const response = {
                    method: "Email_login",
                    email: email,
                }
                setAction({ page: "Otp_page", data: response })
            }
        })
    }

    return (
        <>


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

            <span className={style.registertext}>New to {appData.company}?<span className={style.registerLink} onClick={e => { e.preventDefault(); setAction({ page: "Login_page", data: {} }) }}> Login</span></span>

        </>
    )
}

export default EmailLogin
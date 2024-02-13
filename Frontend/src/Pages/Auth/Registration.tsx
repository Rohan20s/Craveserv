import { useState } from "react"
import style from "./landing.module.css"
import { AiOutlineGoogle, AiOutlineClose } from 'react-icons/ai'
import 'react-phone-input-2/lib/style.css'
import { verifyUser } from "../../Api/AuthServices"
import PhoneInput from "react-phone-input-2"
import { useNavigate } from "react-router-dom"


const Registration = (
    { setSignUpVisible, setData, setLoginVisiblity, setVerificationVisiblity }:
        {
            setSignUpVisible: (value: boolean) => void,
            setData: (value: any) => void,
            setLoginVisiblity: (value: boolean) => void,
            setVerificationVisiblity: (value: boolean) => void
        }) => {

    const [inputEmail, setInputEmail] = useState<string>("")
    const [inputPhone, setInputPhone] = useState<string>("")
    const [inputName, setInputName] = useState<string>("")
    const [error, setError] = useState<any>({})
    const input1 = document.getElementById("phone")
    const input2 = document.getElementById("email")

    async function SubmitDetails(e: React.MouseEvent<HTMLElement>) {

        e.preventDefault()

        const response = {
            method: "Registration",
            email: inputEmail,
            phone: "+" + inputPhone,
            name: inputName
        }


        await verifyUser(response).then((data: any) => {

            if (data.error) {
                if (JSON.parse(data.error).phone) {
                    setError({ number: JSON.parse(data.error).phone })
                    if (input1)
                        input1.style.borderColor = "red";
                } else if (JSON.parse(data.error).email) {
                    setError({ email: JSON.parse(data.error).email })
                    if (input2)
                        input2.style.borderColor = "red";
                }
                console.log(data)
            }
            else {
                setError({})
                response.phone = "+" + response.phone
                setData(response);
                setSignUpVisible(false)
                setVerificationVisiblity(true)
                // sessionStorage.setItem("token", data)
            }

        }
        );


        // await EmailVerification({ email: inputEmail }).then(res => console.log(res)).catch(err => console.log(err))
    }

    return (
        <>
            <form className={style.formContainer} >

                <header className={style.header}>
                    <h4 className={style.subHeading}>Registration</h4>
                    <AiOutlineClose className={style.closeIcon} onClick={e=>{e.preventDefault(); setSignUpVisible(false)}}/>
                </header>

                <input className={style.inputContainer} placeholder='Enter your name' style={{ padding: "0 10px", width: "96%" }} onChange={e => setInputName(e.target.value)} />

                <div className={style.inputContainer} id="phone">
                    <PhoneInput
                        country={'in'}
                        value={inputPhone}
                        onChange={phone =>{setInputPhone(phone); if(input1) input1.style.borderColor="#9c9c9c"; setError("")}}
                    />
                </div>
                <span className={style.errorText}>{error.number}</span>

                <input className={style.inputContainer} 
                id="email"
                placeholder='Enter your email' 
                style={{ padding: "0 10px", width: "96%" }} 
                onChange={e => {setInputEmail(e.target.value); if(input2) input2.style.borderColor="#9c9c9c"; setError("")}} />
                <span className={style.errorText}>{error.email}</span>

                <button className={style.otpBtn} onClick={SubmitDetails}>
                    <span className={style.btnText}>Send verification code</span>
                </button>

                <span className={style.orText}>
                    <hr className={style.line} style={{ zIndex: "0" }} />
                    <span style={{ background: "white", zIndex: "1", width: "40px", textAlign: "center" }}>or</span>
                </span>

                <button className={style.optionBtn} onClick={e=>{}}>
                    <AiOutlineGoogle className={style.optionIcon} />
                    <span className={style.optionText}>Continue with Google</span>
                </button>

                <span className={style.registertext}>Already have an account?<span className={style.registerLink}
                    onClick={e => {
                        e.preventDefault();
                        setSignUpVisible(false);
                        setLoginVisiblity(true);
                        setData({});
                    }}> Login</span></span>
            </form>
            <div className={style.absoluteScreen} onClick={e => setSignUpVisible(false)}>
            </div>
        </>
    )
}

export default Registration
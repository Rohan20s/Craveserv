import { useEffect, useState } from 'react'
import style from "./landing.module.css"
import { AiOutlineClose } from 'react-icons/ai'
import 'react-phone-input-2/lib/style.css'
import { AiFillMail, AiOutlineGoogle } from 'react-icons/ai'
import PhoneInput from 'react-phone-input-2'
import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import { API } from "../../Api/API"
import { GoogleAuthAPI, verifyNumber } from "../../Api/AuthServices"


const Landing = (
  { setLoginVisiblity, setSignUpVisible, setEmailLoginVisiblity, setVerificationVisiblity, setData }
    :
    {
      setLoginVisiblity: (value: boolean) => void,
      setSignUpVisible: (value: boolean) => void,
      setEmailLoginVisiblity: (value: boolean) => void,
      setVerificationVisiblity: (value: boolean) => void,
      setData: (value: any) => void
    }

) => {


  const { appData } = useSelector((state: RootState) => state)
  var [number, setNumber] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const input = document.getElementById("phone")


  async function SubmitDetail(e: any) {
    e.preventDefault()
    setLoading(true)
    
    number="+"+number
    setNumber(number)

    await verifyNumber({ phone: number }).then((data: any) => {

      if (data.error) {
        setError(data.error)
        setLoading(false)
        if (input)
          input.style.borderColor = "red";
      }
      else {
        setError("")
        setLoading(false)
        setData({
          method: "Phone_login",
          phone: number
        })
        setLoginVisiblity(false)
        setVerificationVisiblity(true)
      }
    })
  }



  return (
    <>
      <form className={style.formContainer} >

        <header className={style.header}>
          <h4 className={style.subHeading}>Login</h4>
          <AiOutlineClose className={style.closeIcon} onClick={e => setLoginVisiblity(false)} />
        </header>

        <div className={style.inputContainer}>
          <PhoneInput
            country={'in'}
            inputProps={{ id: "phone" }}
            onChange={phone => {setNumber(phone); if(input) input.style.borderColor="#9c9c9c"}}
          />
        </div>
        <span className={style.errorText}>{error}</span>

        <button className={style.otpBtn} onClick={SubmitDetail}>
          <span className={style.btnText}>Send One Time Password</span>
        </button>

        <span className={style.orText}>
          <hr className={style.line} style={{ zIndex: "0" }} />
          <span style={{ background: "white", zIndex: "1", width: "40px", textAlign: "center" }}>or</span>
        </span>

        <button className={style.optionBtn} onClick={e=>{setLoginVisiblity(false); setEmailLoginVisiblity(true)}}>
          <AiFillMail className={style.optionIcon} />
          <span className={style.optionText} >Continue with Email</span>
        </button>

        <button className={style.optionBtn} >
          <AiOutlineGoogle className={style.optionIcon} />
          <span className={style.optionText} >Continue with Google</span>
        </button>

        <span className={style.registertext}>New to {appData.company}?<span className={style.registerLink} onClick={e => { e.preventDefault(); setSignUpVisible(true) }}> Create account</span></span>

      </form>
      <div className={style.absoluteScreen} onClick={e => setLoginVisiblity(false)}>
      </div>
    </>

  )
}

export default Landing
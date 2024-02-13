import style from "../landing.module.css"
import { AiFillMail, AiOutlineGoogle } from 'react-icons/ai'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useSelector } from "react-redux"
import { RootState } from "../../../Store"
import { API } from "../../../Api/API"
import { GoogleAuthAPI, verifyNumber } from "../../../Api/AuthServices"
import { useState } from "react"

const Login = ({ setAction}: { setAction: (value: any) => void }) => {

  const { appData } = useSelector((state: RootState) => state)

  const [number, setNumber] = useState<string>("")

  const [error, setError] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)

  const input = document.getElementById("email")


  async function SubmitDetail(e:any) {
      e.preventDefault()
      setLoading(true)

      await verifyNumber({ number: number }).then((data: any) => {
          
        if (data.error) {
              setError(data.error)
              setLoading(false)
              if (input)
                  input.style.borderColor = "red";
          }
          else {
              setLoading(false)
              const response = {
                  method: "Phone_login",
                  phone: "+"+number,
              }
              setAction({ page: "Otp_page", data: response })
          }
      })
  }


  // async function handleGoogleAuth(e: any) {
  //   e.preventDefault()

  //   window.open(`${API.staticBaseUrl}/auth/google/callback`, "_self")
  // }



  return (
    <>
      <div className={style.inputContainer}>
        <PhoneInput
          country={'in'}
          onChange={phone => setNumber(phone)}
        />
      </div>

      <button className={style.otpBtn} onClick={SubmitDetail}>
        <span className={style.btnText}>Send One Time Password</span>
      </button>

      <span className={style.orText}>
        <hr className={style.line} style={{ zIndex: "0" }} />
        <span style={{ background: "white", zIndex: "1", width: "40px", textAlign: "center" }}>or</span>
      </span>

      <button className={style.optionBtn}>
        <AiFillMail className={style.optionIcon} />
        <span className={style.optionText} onClick={e=>{e.preventDefault(); setAction({page:"Email_page",data:{}})}}>Continue with Email</span>
      </button>

      <button className={style.optionBtn}>
        <AiOutlineGoogle className={style.optionIcon} />
        <span className={style.optionText} >Continue with Google</span>
      </button>

      <span className={style.registertext}>New to {appData.company}?<span className={style.registerLink} onClick={e=>{e.preventDefault(); setAction({page:"Registration_page",data:{}})}}> Create account</span></span>

    </>
  )
}

export default Login
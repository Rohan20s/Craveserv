import React from 'react'
// import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
// import { FaLocationDot } from "react-icons/fa6"
import style from './searchInput.module.css'
// import { MdGpsFixed } from "react-icons/md"
import { AiOutlineClose } from "react-icons/ai"
// import { BsClockHistory } from "react-icons/bs"
import { FiSearch } from "react-icons/fi"
import dish from "../../../Assests/dish.avif"

const Searchinput = () => {
    
    const [suggestionVisible, setSuggestionVisible] = React.useState(false)
    const windowWidth = window.innerWidth
    
    console.log("login")

    return (
        < >
            <FiSearch className={style.searchIcon} color='grey' />
            <input className={style.searchInput} placeholder='Search for restaurant, cuisine or a dish'
                onClick={e => setSuggestionVisible(true)} onBlur={e => windowWidth > 767 ? setSuggestionVisible(false) : 0} />


            <div className={suggestionVisible ? style.suggestionContainer : style.hide} id="suggestionBox">

                <div className={style.header} >
                    <div className={style.heading}>
                        <div className={style.subHeading}>Select delivery location </div>
                        <AiOutlineClose className={style.closeIcon} onClick={e => setSuggestionVisible(false)} />
                    </div>
                    <div className={style.inputContainer} >
                        <span className={style.placeHolder}>Search for restaurant, cuisine or a dish</span>
                        <FiSearch className={style.searchIcon} />
                        <input className={style.searchInput} id="search" />
                    </div>
                </div>

                <div className={style.quicklist}>
                    <div className={style.subHeading} >Most Recent</div>

                    <div className={style.list}>
                        <img alt="" src={dish} className={style.listIcon}/>
                        <div className={style.titleContainer}>
                            <div className={style.titlename}>Raipur, Chhattisgarh</div>
                            <div className={style.subTitle}> Modhapara | Delivery</div>
                            <div className={style.subTitle}>Using GPS</div>
                        </div>
                    </div>
                   

                </div>
            </div>
        </>
    )
}

export default Searchinput
import React from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import { FaLocationDot } from "react-icons/fa6"
import style from './location.module.css'
import { MdGpsFixed } from "react-icons/md"
import { AiOutlineClose } from "react-icons/ai"
import { BsClockHistory } from "react-icons/bs"
// import useGeoLocation from '../../../Store/Features/GetLocation'
// import useSuggestedLocation from '../../../Store/Features/GetSuggestedLocation'
import {FiSearch} from "react-icons/fi"

const LocationInput = () => {
    const [suggestionVisible, setSuggestionVisible] = React.useState(false)
    const windowWidth = window.innerWidth

    console.log("login")

    // const {data} =useGeoLocation()

    // useEffect(()=>{
    //   console.log(data)
    // },[data])

    return (
        < >
            <FaLocationDot className={style.locationIcon} />
            <input className={style.locaionInput} onClick={e => setSuggestionVisible(true)} onBlur={e=>windowWidth > 767 ? setSuggestionVisible(false):0}/>
            {suggestionVisible ?
                <IoMdArrowDropup className={style.dropDownIcon} /> :
                <IoMdArrowDropdown className={style.dropDownIcon} />
            }
            <div className={style.dividedLine} />


            <div className={suggestionVisible ? style.suggestionContainer : style.hide} id="suggestionBox">
              
                <div className={style.header} >
                    <div className={style.heading}>
                        <div className={style.subHeading} >Select delivery location </div>
                        <AiOutlineClose className={style.closeIcon} onClick={e=>setSuggestionVisible(false)}/>
                    </div>
                    <div className={style.inputContainer}>
                        <FiSearch className={style.searchIcon} />
                        <input className={style.searchInput} placeholder='Search location' id="search" />
                    </div>
                </div>

                <div className={style.quicklist}>
                    <div className={style.list}>
                        <div className={style.titleContainer}>
                            <MdGpsFixed className={style.gpsIcon} />
                            <div className={style.highlightTitlename}>Detect Current Location</div>
                        </div>
                        <div className={style.subTitle}>Using GPS</div>
                    </div>

                    <hr className={style.bottomBorder} />
                    <div className={style.subHeading} >Most Recent</div>

                    <div className={style.list}>
                        <div className={style.titleContainer}>
                            <BsClockHistory className={style.listIcon} />
                            <div className={style.titlename}>Raipur, Chhattisgarh</div>
                        </div>
                        <div className={style.subTitle}>Using GPS</div>
                    </div>
                    <div className={style.list}>
                        <div className={style.titleContainer}>
                            <BsClockHistory className={style.listIcon} />
                            <div className={style.titlename}>Raipur, Chhattisgarh</div>
                        </div>
                        <div className={style.subTitle}>Using GPS</div>
                    </div>
                    <div className={style.list}>
                        <div className={style.titleContainer}>
                            <BsClockHistory className={style.listIcon} />
                            <div className={style.titlename}>Raipur, Chhattisgarh</div>
                        </div>
                        <div className={style.subTitle}>Using GPS</div>
                    </div>
                    <div className={style.list}>
                        <div className={style.titleContainer}>
                            <BsClockHistory className={style.listIcon} />
                            <div className={style.titlename}>Raipur, Chhattisgarh</div>
                        </div>
                        <div className={style.subTitle}>Using GPS</div>
                    </div>
                    <div className={style.list}>
                        <div className={style.titleContainer}>
                            <BsClockHistory className={style.listIcon} />
                            <div className={style.titlename}>Raipur, Chhattisgarh</div>
                        </div>
                        <div className={style.subTitle}>Using GPS</div>
                    </div>
                    <div className={style.list}>
                        <div className={style.titleContainer}>
                            <BsClockHistory className={style.listIcon} />
                            <div className={style.titlename}>Raipur, Chhattisgarh</div>
                        </div>
                        <div className={style.subTitle}>Using GPS</div>
                    </div>
                    <div className={style.list}>
                        <div className={style.titleContainer}>
                            <BsClockHistory className={style.listIcon} />
                            <div className={style.titlename}>Raipur, Chhattisgarh</div>
                        </div>
                        <div className={style.subTitle}>Using GPS</div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LocationInput
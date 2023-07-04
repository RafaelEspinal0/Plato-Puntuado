import { FC, useEffect, useState } from "react"
import {Slide} from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import styles from './RestaurantSlideShow.module.css'

interface Props{
    images: string[]
}


export const RestaurantSlideShow:FC<Props> = ({images}) => {
    const [isPhoto, setIsPhoto] = useState(false)

    useEffect(() => {
      const photo = () =>{
        if (images.length === 0){
            setIsPhoto(false)
        }else{
            setIsPhoto(true)
        }
      }
      photo()
     
    })

  return (
    <Slide
        easing="ease"
        duration={7000}
        indicators
    >
        {
            isPhoto ?
            images.map( image => {
                const url = `/restaurants/${image}`;
                return(
                    <div className={styles['each-slide']} key={image}>
                        <div style={{
                            backgroundImage:`url(${url})`,
                            backgroundSize: 'cover'
                        }}>

                        </div>
                    
                    </div>
                )
            })
            :
            <div className={styles['each-slide']}>
                <div style={{
                    backgroundImage:`url(/lighttheme.png)`,
                    backgroundSize: 'cover'
                }}>

                </div>
                    
            </div>
            
        }
    </Slide>
  )
}

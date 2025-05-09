import '../styles/About.css';
import { useEffect } from 'react';


export default function About() {

    useEffect(() => {
        const img1 = new Image();
        img1.src = "./../assets/adam.jpg";
    }, []);

    return (
        <section id="about">
            <div id="aboutBackground" />
            <div id="aboutContainer">
                <div id="aboutParagraphContainer">
                    <p id="aboutParagraph">Hi, I'm Adam Del Vecchio, the proud owner of Golden Grove Bicycle, your neighborhood bike shop. I'm a lifelong cycling enthusiast with a passion for helping people. Whether it's for commuting, weekend trails, or your kid’s first bike. At Golden Grove, I believe in honest service, quality gear, and supporting our local cycling community. Stop by and say hello—I'm always happy to talk bikes!</p>
                </div>
                <div id="aboutImgContainer">
                    <div id="aboutImg" />
                </div>
            </div>
        </section>
    )
}
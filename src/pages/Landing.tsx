import "../styles/Landing.css";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';

export default function Landing() {
  const form = useRef<HTMLFormElement | null>(null);
  const imgCarouselRef = useRef([true, true, true, true, false, false, false, false]);
  const imgCarouselIndex = useRef(3);
  const upNext = useRef(4);
  const scrollRef = useRef(-1);
  const [imgCarousel, setImgCarousel] = useState(imgCarouselRef.current);
  const [imgTransition, setImgTransition] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [modal, setModal] = useState(false);
  const [aptPhone, setAptPhone] = useState("");
  const limit = 7;
  const [mobile, setMobile] = useState(window.innerWidth <= window.innerHeight);
  const visibleCount = mobile ? 1 : 3;
  const [reviewsOnScreen, setReviewsOnScreen] = useState(Array.from({ length: visibleCount + 1 }, (_, i) => i));
  const reviewIndex = useRef(0);
  const [onScreenIndex, setOnScreenIndex] = useState(0);
  const timeSent = new Date().toLocaleString();
  const reviewListRef = useRef<(HTMLDivElement | null)>(null);
  const cycleDuration = 8000;

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= window.innerHeight);
      setOnScreenIndex(0);
      setReviewsOnScreen(Array.from({ length: visibleCount + 1 }, (_, i) => i));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const reviewData = [
    {
        name: "Jeep Guy",
        review: "Adam is the best I've seen I bought a new E-bike for myself for a Christmas gift. He did a much needed tuneup found out parts on my derailleur was bent from shipping and it wasn't assembled correctly from the factory I felt like something was wrong with the shifting and plus I was tired of Ghost 👻 pedaling at Pas.5 in 7th gear ⚙️ changed out the freewheel from 14-28 teeth to 11-28t now it hits 30 plus mph with no problem And the cadence is perfect...If you have the same issue let him upgrade it for you, check it out on YouTube. And I bet you this guy can build a bike with his eyes closed He's the picasso of bikes..."
    },
    {
        name: "Dom Crotty",
        review: "Adam, the owner of Golden Grove Bicycle Company is a great guy! He loves bicycles. He's fair, honest and he does what he says he's going to do. He worked with me to purchase and recondition two older Specialized Allez bikes, getting me and my wife set-up with exactly what we wanted. He's flexible and can schedule-- as he runs his shop part-time. Clearly though, he loves working with bicycles and people that ride them. I wouldn't go anywhere else. Thank you, Adam",
    },
    {
        name: "Mary Nash-Powell",
        review: "I brought my grandson's bike in to have a flat tire fixed. He pointed out a few other issues that should be addressed. When we picked it up, the bike looked completely reconditioned. The price was very reasonable as well. Highly recommended.",
    },
    {
        name: "Joshua Fetterolf",
        review: "Adam was excellent! Fast and well-priced. He fixed the tire that I was there for and then went over the whole bike as a courtesy. Will definitely be back.",
    },
    {
        name: "Charlie Davis",
        review: "Highly recommend for all your biking needs!",
    },
    {
        name: "Alex Warren",
        review: "I was recommended Adam by a mutual friend. I hadn’t ridden in years and knew absolutely nothing. Adam took a bike I had purchased used and really brought life back into it. He was conscious of my budget and helped me find a good balance between fixing and upgrading components. He didn’t shy away from my endless questions and made me feel great about the work being done. All that to say, he’s a phenomenal mechanic and you won’t be disappointed using him. As a direct result of his work I was able to put 200 miles on my bike in the first month with no mechanical issues and a very comfortable ride. Can’t ask for much more than that!",
    },
    {
        name: "Nancy Dalton",
        review: "Dropped by to repair a bike as I couldn’t bring it in. Adam is honest and did just what he promised. Very reasonable fee. Highly recommend!",
    },
    {
        name: "Jeff Kennedy",
        review: "I went to Adam with a dropper post issue - he found the cable was bad likely due to improper install (which was no surprise considering I installed it). While he was making quick work of that fix we discussed a few other questions I had about the bike and he looked over everything for me. He ended up making adjustments to some of my hand controls for better access while riding, added air to my shocks and explained how much should be in there and how often I should check it, then he trued a wobbly wheel and brake rotor. This all would have cost me a lot of time and $$$ at any other bike shop but Adam was fast and the price was absolutely reasonable. Great work Adam I will definitely be coming back with all my bikes!",
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 10);
    const interval = setInterval(() => {
      setImgTransition(true);
      // Check if the index + 1 is greater than the limit and if so, set it to 0
      imgCarouselIndex.current = imgCarouselIndex.current + 1 > limit ? 0 : imgCarouselIndex.current + 1;
      upNext.current = imgCarouselIndex.current - 4 < 0 ? (imgCarouselIndex.current - 4) + (limit + 1) : imgCarouselIndex.current - 4;
      imgCarouselRef.current = imgCarouselRef.current.map((_, index) => {
        if (imgCarouselIndex.current <= limit && imgCarouselIndex.current >= 3) {
          if (index >= imgCarouselIndex.current - 3 && index <= imgCarouselIndex.current) {
            return true;
          } else {
            return false;
          }
        } else {
          if (index > limit - 3 && index <= limit) {
            if ((0 - (limit + 1)) + index >= imgCarouselIndex.current - 3 && (0 - (limit + 1)) + index <= imgCarouselIndex.current) {
              return true;
            } else {
              return false;
            }
          } else {
            if (index >= imgCarouselIndex.current - 3 && index <= imgCarouselIndex.current) {
              return true;
            } else {
              return false;
            }
          }
        }
      });
      setImgCarousel(imgCarouselRef.current);
      setTimeout(() => {
        setImgTransition(false);
      }, 500);
    }, 3000);

    const reviewInterval = setInterval(() => {
      setOnScreenIndex(prev => {
        const newOnScreen = (prev + 1) % (visibleCount + 1);

          setReviewsOnScreen(prevScreen => {
            const updated  = [...prevScreen];
            
            reviewIndex.current = (reviewIndex.current + 1) % reviewData.length;
            updated[prev] = (reviewIndex.current + visibleCount) % reviewData.length;

            return updated;
          });
          return newOnScreen;
      });
    }, cycleDuration);

    // reviewInterval();
    // const animationInterval = setInterval((reviewInterval), 8040);


    return () => {
      clearInterval(interval);
      clearInterval(reviewInterval);
      // clearInterval(animationInterval);
      // clearInterval(animationInterval);
      clearTimeout(timeout);
      setLoaded(false);
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target as HTMLInputElement;
    nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, "");
  }
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let phone = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    
    
    if (phone.length > 0) {
      phone = '(' + phone;
    }

    if (phone.length > 4) {
      phone = phone.slice(0, 4) + ') ' + phone.slice(4);
    }

    if (phone.length > 9) {
      phone = phone.slice(0, 9) + '-' + phone.slice(9, 13);
    }
    
    setAptPhone(phone);
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target as HTMLInputElement;
    emailInput.value = emailInput.value.replace(/[^a-zA-Z0-9@._-]/g, "");
  }

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs.sendForm(
        'service_v635jdv',
        'template_2dygy7n',
        form.current,
        'DsniDbEqda8GKVTuw'
      ).then((result) => {
        console.log(result.text);
        setModal(false);
      }, (error) => {
        console.log(error.text);
        alert("An error occurred while sending the message. Please try again later.");
      });
    } else {
      alert("Form reference is not available. Please try again.");
    }
  }

  const reviewsList = () => {
    return reviewsOnScreen.map((data, index) => {
      if (index === reviewsOnScreen.length - 1) return null;
      return (
        <div key={index} className={`landingReviewContainer ${index >= onScreenIndex && index < onScreenIndex + 4 ? `reviewOnScreen` : "reviewOffScreen"} ${onScreenIndex + 4 === index ? "reviewUpNext" : ""}`}>
          <p className="landingReviewTitle">{reviewData[data].name}</p>
          <p className="ratingContainer">{"⭐".repeat(5)}</p>
          <p className="landingReviewSummary">{reviewData[data].review}</p>
        </div>
      );
    });  
  }

  return (
    <div id="landing">
      <div id="landingTitleContainer">
        <h1 id="landingTitle">Speedy Repairs, {mobile && <><br /><span>&emsp;&emsp;</span></>}Smooth Rides.</h1>
        {/* Ride Local. Repair Local. */}
      </div>
      {/* <div id="landingSummaryContainer">
        <p id="landingSummary">We are a local bike repair shop that specializes in all types of bicycles. We offer a wide range of services, from basic tune-ups to complete overhauls. We are dedicated to providing the best possible service to our customers.</p>
        <div id="landingSummaryContact">
          <p id="landingComeVisit" className="landingSummaryInfo">Feel free to ride on by anytime!</p>
          <Link id="landingSummaryPhone" className="landingSummaryInfo" to="tel:+18032705688">(803) 270-5688</Link>
            <Link id="landingSummaryAddress" className="landingSummaryInfo" to="https://www.google.com/maps/place/205+Kennedy+Ln,+Piedmont,+SC+29673" target="_blank" rel="noopener noreferrer">205 Kennedy Ln Piedmont, SC 29673</Link>
        </div>
      </div> */}
      <div id="landingRepairContainer">
        <h2 id="landingRepairTitle" className={loaded ? "loaded" : ""}>Expert Bicycle Repair Services</h2>
        <div id="landingRepairImageWrapper">
          <div id="landingRepairImageContainer">
            <div id="landingRepairImage0" className={`lrImage lrImg0 ${imgCarousel[0] && imgCarouselIndex.current >= 3 ? "lriOnScreen" : "lriOffScreen"} ${imgTransition ? "activeM" : ""}`} />
            <div id="landingRepairImage1" className={`lrImage lrImg1 ${imgCarousel[1] && imgCarouselIndex.current >= 3 ? "lriOnScreen" : "lriOffScreen"} ${imgTransition ? "activeM" : ""}`} />
            <div id="landingRepairImage2" className={`lrImage lrImg2 ${imgCarousel[2] && imgCarouselIndex.current >= 3 ? "lriOnScreen" : "lriOffScreen"} ${imgTransition ? "activeM" : ""}`} />
            <div id="landingRepairImage3" className={`lrImage lrImg3 ${imgCarousel[3] ? "lriOnScreen" : "lriOffScreen"} ${imgTransition ? "activeM" : ""} ${upNext.current === 3 ? "upNext" : ""}`} />
            <div id="landingRepairImage4" className={`lrImage lrImg4 ${imgCarousel[4] ? "lriOnScreen" : "lriOffScreen"} ${imgTransition ? "activeM" : ""} ${upNext.current === 4 ? "upNext" : ""}`} />
            <div id="landingRepairImage5" className={`lrImage lrImg5 ${imgCarousel[5] ? "lriOnScreen" : "lriOffScreen"} ${imgTransition ? "activeM" : ""} ${upNext.current === 5 ? "upNext" : ""}`} />
            <div id="landingRepairImage6" className={`lrImage lrImg6 ${imgCarousel[6] ? "lriOnScreen" : "lriOffScreen"} ${imgTransition ? "activeM" : ""} ${upNext.current === 6 ? "upNext" : ""}`} />
            <div id="landingRepairImage7" className={`lrImage lrImg7 ${imgCarousel[7] ? "lriOnScreen" : "lriOffScreen"} ${imgTransition ? "activeM" : ""} ${upNext.current === 7 ? "upNext" : ""}`} />
            <div id="landingRepairImage8" className={`lrImage lrImg0 ${imgCarousel[0] && imgCarouselIndex.current <= 2 ? "lriOnScreen" : "lriOffScreen"} ${imgTransition ? "activeM" : ""} ${upNext.current === 0 ? "upNext" : ""}`} />
            <div id="landingRepairImage9" className={`lrImage lrImg1 ${imgCarousel[1] && imgCarouselIndex.current <= 2 ? "lriOnScreen" : "lriOffScreen"} ${imgTransition ? "activeM" : ""} ${upNext.current === 1 ? "upNext" : ""}`} />
            <div id="landingRepairImage10" className={`lrImage lrImg2 ${imgCarousel[2] && imgCarouselIndex.current <= 2 ? "lriOnScreen" : "lriOffScreen"} ${imgTransition ? "activeM" : ""} ${upNext.current === 2 ? "upNext" : ""}`} />
          </div>
          <p id="landingRepairSummary">We offer fast and efficient services tailored to your needs.</p>
        </div>
      </div>
      <div id="landingMaintenanceContainer">
        <div id="landingInspectionsWrapper" className="landingWorkWrapper">
          <h2 id="landingInspectionsTitle" className={`landingMaintenanceTitle ${loaded ? "loaded" : ""}`}>Comprehensive Inspections</h2>
          <div id="landingInspectionsContainer" className="landingWorkContainer">
            <div id="landingInspectionsOverlay" className="landingWorkOverlay" />
            <p id="landingInspectionsSummary" className="landingWorkSummary">Our experienced technicians will thoroughly inspect your bike, identifying any issues or areas that need attention. We’ll provide a detailed report and recommendations to keep your ride in top shape.</p>
          </div>
        </div>
        <div id="landingPersonalizedWrapper" className="landingWorkWrapper">
        <h2 id="landingPersonalizedTitle" className={`landingMaintenanceTitle ${loaded ? "loaded" : ""}`}>Personalized Maintenance</h2>
          <div id="landingPersonalizedContainer" className="landingWorkContainer">
            <div id="landingPersonalizedOverlay" className="landingWorkOverlay" />
            <p id="landingPersonalizedSummary" className="landingWorkSummary">With our customized maintenance plans, we’ll ensure your bicycle receives the specialized care it needs, from regular tune-ups to comprehensive overhauls. Trust us to keep your bike running smoothly.</p>
          </div>
        </div>
      </div>
      <div id="landingApptContainer">
        <input id="landingApptButton" type="button" value="Book Appointment" onClick={() => {setModal(true)}} />
      </div>
      <div id="landingReviewsArea">
        <h2 id="landingReviewsTitle" className={loaded ? "loaded" : ""}>What Our Customers Say</h2>
        <div id="landingReviewsWrapper">
          <div id="landingReviewsOverlay" />
          <div id="landingReviewsContainer1" ref={reviewListRef} className={`landingReviewsContainer ${onScreenIndex < visibleCount ? "onScreen" : ""}`}>
            {reviewsList()}
          </div>
          <div id="landingReviewsContainer2" ref={reviewListRef} className={`landingReviewsContainer ${onScreenIndex < visibleCount ? "onScreen" : ""}`}>
            <div key={visibleCount + 1} className={`landingReviewContainer ${visibleCount >= onScreenIndex && visibleCount < onScreenIndex + 4 ? `reviewOnScreen` : "reviewOffScreen"} ${onScreenIndex + 4 === visibleCount ? "reviewUpNext" : ""}`}>
              <p className="landingReviewTitle">{reviewData[reviewsOnScreen[visibleCount]].name}</p>
              <p className="ratingContainer">{"⭐".repeat(5)}</p>
              <p className="landingReviewSummary">{reviewData[reviewsOnScreen[visibleCount]].review}</p>
            </div>
          </div>
          <div id="landingReviewsContainer3" ref={reviewListRef} className={`landingReviewsContainer ${onScreenIndex < visibleCount ? "onScreen" : ""}`}>
            {reviewsList()}
          </div>
        </div>
        <h2 id="landingLeaveReviewTitle" className={loaded ? "loaded" : ""}>Let us know what you think</h2>
        <div id="landingReviewBtnContainer">
          <Link id="landingGoogleBtn" className="landingReviewBtn" to="https://www.google.com/search?q=golden+grove+bicycles&sca_esv=6f4cffb8fcc6cffb&sxsrf=AHTn8zrrk5jcha03FlEWHVme9gyitiprzA%3A1746549437436&source=hp&ei=vToaaLSuGOvfkPIPzfLrKA&iflsig=ACkRmUkAAAAAaBpIzcXd8oxOaLXv0pUNLOyCL4fZh_jB&oq=golden+gro&gs_lp=Egdnd3Mtd2l6Igpnb2xkZW4gZ3JvKgIIADIEECMYJzIEECMYJzIOEC4YgAQYxwEYjgUYrwEyCxAAGIAEGLEDGIMBMgUQLhiABDILEC4YgAQYxwEYrwEyBRAuGIAEMgsQLhiABBjHARivATIFEAAYgAQyBRAAGIAESPEPUABY9ghwAHgAkAEAmAGHAaABtQmqAQMxLjm4AQPIAQD4AQGYAgqgAs8JwgIKECMYgAQYJxiKBcICFBAuGIAEGJECGMcBGIoFGI4FGK8BwgILEC4YgAQYkQIYigXCAhEQLhiABBixAxjRAxiDARjHAcICCxAAGIAEGJECGIoFwgIIEAAYgAQYsQPCAgsQLhiABBixAxiDAcICDhAuGIAEGLEDGNEDGMcBwgIIEC4YgAQYsQPCAg4QLhiABBixAxjHARivAZgDAJIHAzEuOaAHwqcBsgcDMS45uAfPCQ&sclient=gws-wiz#lrd=0x885839946d5aca79:0x664da6df808040bc,3,,,," target="_blank" rel="noopener noreferrer">
            Leave a&nbsp;
            <svg className="compLogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
            &nbsp;Review
          </Link>
          <Link id="landingYelpBtn" className="landingReviewBtn" to="https://www.yelp.com/writeareview/biz/acU0GygCCz1rdVNFKz74BA?return_url=%2Fbiz%2FacU0GygCCz1rdVNFKz74BA&review_origin=biz-details-war-button" target="_blank" rel="noopener noreferrer">
            Leave a&nbsp;
            <svg className="compLogo" xmlns="http://www.w3.org/2000/svg" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 228.097 228.097" ><g><path style={{fill:'#C1272D'}} d="M173.22,68.06c8.204,6.784,30.709,25.392,27.042,38.455c-1.696,5.867-8.434,7.746-13.43,9.579   c-11.505,4.171-23.33,7.471-35.339,9.9c-9.717,1.971-30.48,6.279-26.63-10.909c1.512-6.646,6.875-12.284,11.184-17.28   c8.846-10.404,17.876-21.405,28.555-29.93c0.871-0.688,1.925-0.871,2.842-0.733C169.232,66.41,171.386,66.502,173.22,68.06z"/><path style={{fill:'#C1272D'}} d="M161.119,205.197c-7.196-5.821-12.284-14.942-16.684-22.917c-4.309-7.7-11.092-17.876-12.238-26.813   c-2.337-18.38,24.292-7.333,31.947-4.675c10.175,3.575,37.447,7.517,34.422,23.421c-2.521,12.971-18.151,28.784-31.213,30.801   c-0.137,0.046-0.321,0-0.504,0c-0.046,0.046-0.092,0.092-0.137,0.137c-0.367,0.183-0.779,0.413-1.192,0.596   C163.961,206.573,162.449,206.252,161.119,205.197z"/><path style={{fill:'#C1272D'}} d="M101.58,157.896c14.484-6.004,15.813,10.175,15.721,19.984c-0.137,11.688-0.504,23.421-1.375,35.063   c-0.321,4.721-0.137,10.405-4.629,13.384c-5.546,3.667-16.225,0.779-21.955-1.008c-0.183-0.092-0.367-0.183-0.55-0.229   c-12.054-2.108-26.767-7.654-28.188-18.792c-0.138-1.283,0.367-2.429,1.146-3.3c0.367-0.688,0.733-1.329,1.146-1.925   c1.788-2.475,3.85-4.675,5.913-6.921c3.483-5.179,7.242-10.175,11.229-14.988C85.813,172.197,92.917,161.471,101.58,157.896z"/><path style={{fill:'#C1272D'}} d="M103.689,107.661c-21.13-17.371-41.71-44.276-52.344-69.164   c-8.113-18.93,12.513-30.48,28.417-35.705c21.451-7.059,29.976-0.917,32.13,20.534c1.788,18.471,2.613,37.08,2.475,55.643   c-0.046,7.838,2.154,20.488-2.429,27.547c0.733,2.888-3.621,4.95-6.096,2.979c-0.367-0.275-0.733-0.642-1.146-0.963   C104.33,108.303,104.009,108.028,103.689,107.661z"/><path style={{fill:'#C1272D'}} d="M101.397,134.566c1.696,7.517-3.621,10.542-9.854,13.384c-11.092,4.996-22.734,8.984-34.422,12.284   c-6.784,1.879-17.188,6.371-23.742,1.375c-4.95-3.758-5.271-11.596-5.729-17.28c-1.008-12.696,0.917-42.993,18.517-44.276   c8.617-0.596,19.388,7.104,26.447,11.138c9.396,5.409,19.48,11.596,26.492,20.076C100.159,131.862,101.03,132.916,101.397,134.566z   "/></g></svg>
            &nbsp;Review
          </Link>
        </div>
      </div>
      <div id="landingModalWrapper" className={modal ? "active" : ""}>
        <div id="landingModalOverlay" onClick={() => {setModal(false); scrollRef.current = -1;}}/>
        <div id="landingModalContainer">
          <form id="landingModal" ref={form} onSubmit={sendEmail}>
            <div id="landingModalCloseContainer">
              <h2 id="landingModalTitle">Book an Appointment</h2>
              <input id="landingModalClose" type="button" value="X" onClick={() => {setModal(false); scrollRef.current = -1;}}/>
            </div>
            <label htmlFor="landingModalName" className="landingModalLabel">Name</label>
            <input id="landingModalName" className="landingModalInput" type="text" name="name" onChange={handleNameChange} required />
            <label htmlFor="landingModalEmail" className="landingModalLabel">Email</label>
            <input id="landingModalEmail" className="landingModalInput" type="email" name="email" onChange={handleEmailChange} required />
            <label htmlFor="landingModalPhone"className="landingModalLabel">Phone</label>
            <input id="landingModalPhone" className="landingModalInput" type="tel" name="phone" value={aptPhone} onChange={handlePhoneChange} required />
            <label htmlFor="landingModalMessage"className="landingModalLabel">Message</label>
            <textarea id="landingModalMessage" className="landingModalTextArea" name="message" required />
            <input type="hidden" name="time" value={timeSent} />
            <input id="landingModalSubmit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
import "../styles/Landing.css";

import { useEffect, useState, useRef } from "react";

export default function Landing() {
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 10);
    const interval = setInterval(() => {
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
      setImgTransition(true);
      setTimeout(() => {
        setImgTransition(false);
      }, 500);
    }, 3000);

    return () => {
      clearInterval(interval);
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

  return (
    <div id="landing">
      <div id="landingTitleContainer">
        <h1 id="landingTitle">Speedy Repairs, Smooth Rides.</h1>
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
          <h2 id="landingInspectionsTitle" className={loaded ? "loaded" : ""}>Comprehensive Inspections</h2>
          <div id="landingInspectionsContainer" className="landingWorkContainer">
            <div id="landingInspectionsOverlay" className="landingWorkOverlay" />
            <p id="landingInspectionsSummary" className="landingWorkSummary">Our experienced technicians will thoroughly inspect your bike, identifying any issues or areas that need attention. We’ll provide a detailed report and recommendations to keep your ride in top shape.</p>
          </div>
        </div>
        <div id="landingPersonalizedWrapper" className="landingWorkWrapper">
        <h2 id="landingPersonalizedTitle" className={loaded ? "loaded" : ""}>Personalized Maintenance</h2>
          <div id="landingPersonalizedContainer" className="landingWorkContainer">
            <div id="landingPersonalizedOverlay" className="landingWorkOverlay" />
            <p id="landingPersonalizedSummary" className="landingWorkSummary">With our customized maintenance plans, we’ll ensure your bicycle receives the specialized care it needs, from regular tune-ups to comprehensive overhauls. Trust us to keep your bike running smoothly.</p>
          </div>
        </div>
      </div>
      <div id="landingApptContainer">
        <input id="landingApptButton" type="button" value="Book Appointment" onClick={() => {setModal(true); scrollRef.current = window.scrollY;}} />
      </div>
      {/* <div id="landingReviewsContainer">
        <h2 id="landingReviewsTitle" className={loaded ? "loaded" : ""}>What Our Customers Say</h2>
        <div id="landingReviewsWrapper">
          <div id="landingReviewsContainer">
            <div id="landingReviewsOverlay" />
            <p id="landingReviewsSummary">We take pride in our work and our customers love us for it. Check out some of the great things they have to say about us!</p>
          </div>
        </div>
      </div> */}
      <div id="landingModalWrapper" className={modal ? "active" : ""}>
        <div id="landingModalOverlay" onClick={() => {setModal(false); scrollRef.current = -1;}}/>
        <div id="landingModalContainer">
          <form id="landingModal">
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
            <input id="landingModalSubmit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
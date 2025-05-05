import "../styles/Projects.css";
import { useEffect, useState, useRef } from "react";

export default function Projects() {
  const onScreenRef = useRef<[Element, number][]>([]);
  const [onScreen, setOnScreen] = useState(Array(4).fill(""));

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            onScreenRef.current.forEach(([el, i]) => {
              if (el === entry.target) {
                const index = i;
                setOnScreen(prev => {
                  const newOnScreen = [...prev];
                  newOnScreen[index] = "animate";
                  return newOnScreen;
                });
                observer.unobserve(entry.target);
                const timeout = setTimeout(() => {
                  setOnScreen(prev => {
                    const newOnScreen = [...prev];
                    newOnScreen[index] = "onScreen";
                    return newOnScreen;
                  });
                }, 1000);
                return clearTimeout(timeout); // Ensure timeout is cleared
              }
            });
          }
        });
      }, { threshold: 0.1 }); // Set threshold to 0.1

      const elements = document.querySelectorAll('.projWrapper');
      elements.forEach((el, index) => {
        observer.observe(el);
        onScreenRef.current.push([el, index]);
      });

      return () => {
        elements.forEach(el => observer.unobserve(el));
      };
    }
    , []);

  return (
    <section id="projects">
        <div id="projectsBackground" />
        <div id="projectsContainer">
          <div id="projRepairWrapper" className="projWrapper">
            <div id="projRepairContainer" className={`projContainer ${onScreen[0]}`}>
              <div id="projRepairTextContainer" className="projTextContainer">
                <h2 id="projRepairText" className="projHeader">Expert Bicycle Repair</h2>
                <p id="projRepairText" className="projText">At Golden Grove Bicycle Company, we understand how important your bike is to you. Our team of experienced technicians are dedicated to providing top-notch repair services to get your bicycle back on the road quickly and safely.</p>
              </div>
              <div id="projRepairImageContainer" className="projImageContainer">
                <div id="projRepairImage" className="projImage">
                  <div id="projRepairImageOverlay" className="projImageOverlay"/>
                </div>
              </div>
            </div>
          </div>
          <div id="projMaintenanceWrapper" className="projWrapper">
            <div id="projMaintenanceContainer" className={`projContainer ${onScreen[1]}`}>
              <div id="projMaintenanceTextContainer" className="projTextContainer">
                <h2 id="projMaintenanceText" className="projHeader">Comprehensive Maintenance</h2>
                <p id="projMaintenanceText" className="projText">From routine tune-ups to major overhauls, we offer comprehensive maintenance services to keep your bike running smoothly. Our experts will thoroughly inspect your bicycle and make any necessary adjustments or replacements to ensure optimal performance.</p>
              </div>
              <div id="projMaintenanceImageContainer" className="projImageContainer">
                <div id="projMaintenanceImage" className="projImage">
                  <div id="projMaintenanceImageOverlay" className="projImageOverlay"/>
                </div>
              </div>
            </div>
          </div>
          <div id="projServiceWrapper" className="projWrapper">
            <div id="projServiceContainer" className={`projContainer ${onScreen[2]}`}>
              <div id="projServiceTextContainer" className="projTextContainer">
                <h2 id="projServiceText" className="projHeader">Personalized Service</h2>
                <p id="projServiceText" className="projText">At Golden Grove Bicycle Company, we understand that every bike and rider is unique. That’s why we take the time to get to know you and your cycling needs, and provide personalized solutions to keep you riding with confidence.</p>
              </div>
              <div id="projServiceImageContainer" className="projImageContainer">
                <div id="projServiceImage" className="projImage">
                  <div id="projServiceImageOverlay" className="projImageOverlay"/>
                </div>
              </div>
            </div>
          </div>
          <div id="projScheduleWrapper" className="projWrapper">
            <div id="projScheduleContainer" className={`projContainer ${onScreen[3]}`}>
              <div id="projScheduleTextContainer" className="projTextContainer">
                <h2 id="projScheduleText" className="projHeader">Convenient Scheduling</h2>
                <p id="projScheduleText" className="projText">We understand that your time is valuable, which is why we offer flexible scheduling options to accommodate your busy lifestyle. Whether you need a quick tune-up or a more extensive repair, our team will work with you to find a convenient time that fits your schedule.</p>
              </div>
              <div id="projScheduleImageContainer" className="projImageContainer">
                <div id="projScheduleImage" className="projImage">
                  <div id="projScheduleImageOverlay" className="projImageOverlay"/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}


import "../styles/Projects.css";
import { useEffect, useState, useRef } from "react";

export default function Projects() {
  const onScreenRef = useRef<[Element, number][]>([]);
  const [onScreen, setOnScreen] = useState(Array(4).fill(""));
  const [mobile, setMobile] = useState(window.innerWidth <= window.innerHeight);

  useEffect(() => {
    const img1 = new Image();
    img1.src = "../assets/greyWork.jpg";
    const img2 = new Image();
    img2.src = "../assets/repair.jpg";
    const img3 = new Image();
    img3.src = "../assets/maintenance.jpg";
    const img4 = new Image();
    img4.src = "../assets/service.jpg";
    const img5 = new Image();
    img5.src = "../assets/schedule.jpg";
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

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
              if (!mobile) {
                setTimeout(() => {
                  setOnScreen(prev => {
                    const newOnScreen = [...prev];
                    newOnScreen[index] = "onScreen";
                    return newOnScreen;
                  });
                }, 1000);
              } else {
                setOnScreen(prev => {
                  const newOnScreen = [...prev];
                  newOnScreen[index] = "onScreen";
                  return newOnScreen;
                });
              }
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
      onScreenRef.current.forEach(([el]) => {
        observer.unobserve(el);
      });
      setOnScreen(Array(4).fill("")); // Reset onScreen state
      window.removeEventListener("resize", handleResize);
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
                <h2 id="projRepairText" className={`projHeader ${onScreen[0]}`}>Expert Bicycle Repair</h2>
                <p id="projRepairText" className={`projText ${onScreen[0]}`}>At Golden Grove Bicycle Company, I understand how important your bike is to you. I'm dedicated to providing top-notch repair services to get your bicycle back on the road quickly and safely.</p>
              </div>
              <div id="projRepairImageContainer" className="projImageContainer">
                <div id="projRepairImage" className={`projImage ${onScreen[0]}`}>
                  <div id="projRepairImageOverlay" className="projImageOverlay"/>
                </div>
              </div>
            </div>
          </div>
          <div id="projMaintenanceWrapper" className="projWrapper">
            <div id="projMaintenanceContainer" className={`projContainer ${onScreen[1]}`}>
              <div id="projMaintenanceTextContainer" className="projTextContainer">
                <h2 id="projMaintenanceText" className={`projHeader ${onScreen[1]}`}>Comprehensive Maintenance</h2>
                <p id="projMaintenanceText" className={`projText ${onScreen[1]}`}>From routine tune-ups to major overhauls, I offer comprehensive maintenance services to keep your bike running smoothly. I will thoroughly inspect your bicycle and make any necessary adjustments or replacements to ensure optimal performance.</p>
              </div>
              <div id="projMaintenanceImageContainer" className="projImageContainer">
                <div id="projMaintenanceImage" className={`projImage ${onScreen[1]}`}>
                  <div id="projMaintenanceImageOverlay" className="projImageOverlay"/>
                </div>
              </div>
            </div>
          </div>
          <div id="projServiceWrapper" className="projWrapper">
            <div id="projServiceContainer" className={`projContainer ${onScreen[2]}`}>
              <div id="projServiceTextContainer" className="projTextContainer">
                <h2 id="projServiceText" className={`projHeader ${onScreen[2]}`}>Personalized Service</h2>
                <p id="projServiceText" className={`projText ${onScreen[2]}`}>At Golden Grove Bicycle Company, I understand that every bike and rider is unique. That’s why I take the time to get to know you and your cycling needs, and provide personalized solutions to keep you riding with confidence.</p>
              </div>
              <div id="projServiceImageContainer" className="projImageContainer">
                <div id="projServiceImage" className={`projImage ${onScreen[2]}`}>
                  <div id="projServiceImageOverlay" className="projImageOverlay"/>
                </div>
              </div>
            </div>
          </div>
          <div id="projScheduleWrapper" className="projWrapper">
            <div id="projScheduleContainer" className={`projContainer ${onScreen[3]}`}>
              <div id="projScheduleTextContainer" className="projTextContainer">
                <h2 id="projScheduleText" className={`projHeader ${onScreen[3]}`}>Convenient Scheduling</h2>
                <p id="projScheduleText" className={`projText ${onScreen[3]}`}>I understand that your time is valuable, which is why I offer flexible scheduling options to accommodate your busy lifestyle. Whether you need a quick tune-up or a more extensive repair, I will work with you to find a convenient time that fits your schedule.</p>
              </div>
              <div id="projScheduleImageContainer" className="projImageContainer">
                <div id="projScheduleImage" className={`projImage ${onScreen[3]}`}>
                  <div id="projScheduleImageOverlay" className="projImageOverlay"/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}


import "./SplashPage.css"
import banner from "../../assets/landingpage.png";

export default function Splash(){
    return (
        <div className="SplashPage-container">
            <div className="SplashPage-main-banner">
                <div className="custom-shape-divider-bottom-1677527040">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                    </svg>
                </div>
                <div className="SplashPage-main-banner-div">
                    <div className="SplashPage-main-banner-text">
                        <h1 className="SplashPage-welcome">Welcome to Daily Moo'd,</h1>
                        <p>
                            the cow-themed mood tracking app that makes self-care fun! With our app, you can track your moods, complete tasks, and earn points to unlock adorable cows that you can feed, play with, and take care of.
                        </p>
                        {/* <button className="SplashPage-signup">
                            Sign Up Today!
                        </button> */}
                    </div>
                    <div className="SplashPage-placeholder">
                    </div>
                </div>
            </div>
            <div className="SplashPage-info-container">
                <div className="SplashPage-main-banner-text">
                    <p>
                        Daily Moo'd is designed to help you prioritize your mental health while making it a fun and interactive experience. Whether you're feeling happy, sad, stressed, or anything in between, our app will help you keep track of your emotions.
                    </p>
                </div>
                <img
                    src="https://keenlychung.com/dailymood/cows/cow_strawberry_scared.PNG"
                    alt="SplashPage cow"
                    className="SplashPage-cow-image-info"
                />
            </div>
            <div className="SplashPage-info-container">
                <img
                    src="https://keenlychung.com/dailymood/cows/cow_taro_angry.PNG"
                    alt="SplashPage cow"
                    className="SplashPage-cow-image-info"
                />
                <div className="SplashPage-main-banner-text">
                    <p>
                        And with our unique cow-themed rewards system, you'll never get bored of tracking your moods! As you complete tasks and record your emotions, you'll earn points that you can use to purchase cute and quirky cows. Feed them, play with them, and watch as they grow and thrive – all while you take care of your own mental health.
                    </p>
                </div>
            </div>
            <div className="SplashPage-info-container">
                <div className="SplashPage-main-banner-text">
                    <p>
                        So why wait? Sign up today and start tracking your moods in a fun and engaging way!
                    </p>
                </div>
                <img
                    src="https://keenlychung.com/dailymood/cows/cow_chocolate_happy.PNG"
                    alt="SplashPage cow"
                    className="SplashPage-cow-image-info"
                />
            </div>
        </div>
    )
}

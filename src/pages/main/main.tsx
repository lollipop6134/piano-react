import { Footer } from '../../components/footer/footer';
import './main.css';
import { Link } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://lxbcgtsajrvcgbuyizck.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4YmNndHNhanJ2Y2didXlpemNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MTkwNTcsImV4cCI6MjAxNTA5NTA1N30.Ey3PDIXgcVqGtU1GAWCPMAKuDgLOC7BhtajQ_bHV5NI");


export function Main() {
    return (
        <>
            <div className='content'>
                <div id="section1" className='container row'>
                <img src={supabase.storage.from("images").getPublicUrl(`Vector1.png`).data.publicUrl} alt="vector1" className='vector'/>
                    <div id="section1left">
                        <div className="header">
                            Be like Capy. Be cool. Play the Piano.
                        </div>
                        <div className="description">
                            Discover the joy of playing piano with our interactive lessons. Unlock your musical potential with PianoCapy!
                        </div>
                        <Link to={"/lessons"}><button className='main-button'>Try Now!</button></Link>
                    </div>
                    <img src={supabase.storage.from("images").getPublicUrl(`Main1.jpg`).data.publicUrl} alt="Capy plays the piano" className="main_img"/>
                </div>
                <div id="section2" className='container row'>
                    <img src={supabase.storage.from("images").getPublicUrl(`Main2.jpg`).data.publicUrl} alt="Capy and music" className='main_img'/>
                    <div id="section2right">
                        <div className='header'>
                            Learn and Play the Piano
                        </div>
                        <div className='description'>
                            Immerse yourself in the world of piano with PianoCapy. Explore interactive lessons and unleash your musical talent. Join us today!
                        </div>
                    </div>
                </div>
                <div id="section3" className='container row'>
                <img src={supabase.storage.from("images").getPublicUrl(`Vector2.png`).data.publicUrl} alt="vector2" className='vector'/>
                    <div id="section3left">
                        <div className='header'>
                            Learn to Play the Piano
                        </div>
                        <div className='description'>
                            Discover the joy of playing the piano with our interactive lessons. Whether you're a beginner or an experienced pianist,
                            our comprehensive tutorials will help you improve your skills and express your creativity.
                        </div>
                    </div>
                    <img src={supabase.storage.from("images").getPublicUrl(`Main3.jpg`).data.publicUrl} alt="Capy and music" className='main_img'/>
                </div>
                <div id="section4" className='container column'>
                    <div className='header'>
                        Our Principles
                    </div>
                    <div className='container row' id="principles">
                        <div className='container column' id="principle">
                            <p className='header'>
                                Interactive learning
                            </p>
                            <p className='description'>
                                Engage in a dynamic learning experience with our interactive piano and lessons. Discover the joy of playing music at your own pace.
                            </p>
                        </div>
                        <div className='container column' id="principle">
                            <p className='header'>
                                Colorful and Vibrant
                            </p>
                            <p className='description'>
                                Immerse yourself in a world of colors and vibrant visuals as you explore the captivating world of piano.
                                Let the music come alive through our visually stimulating platform.
                            </p>
                        </div>
                        <div className='container column' id="principle">
                            <p className='header'>
                                Anywhere, Anytime
                            </p>
                            <p className='description'>
                                    Enjoy the flexibility of learning piano wherever and whenever you want. Our platform is accessible on various devices, allowing you to practice and
                                    improve your skills on the go.
                            </p>
                        </div>
                    </div>
                </div>
                <div id="section5" className='container column'>
                    <img src={supabase.storage.from("images").getPublicUrl(`Vector3.png`).data.publicUrl} alt="vector 3" className='vector'/>
                    <div className='header'>
                        About PianoCapy
                    </div>
                    <div className='description'>
                        PianoCapy is a dynamic online platform that aims to make learning the piano accessible and enjoyable for everyone.
                        With our user-friendly interface and colorful design, you'll be immersed in a world of music from the moment you start playing.
                    </div>
                </div>
                <div className='container row' id="section6">
                    <img src={supabase.storage.from("images").getPublicUrl(`Main4.jpg`).data.publicUrl} alt="Capy and Piano" className='main_img' />
                    <img src={supabase.storage.from("images").getPublicUrl(`Main5.jpg`).data.publicUrl} alt="Capy and Piano" className='main_img' />
                    <img src={supabase.storage.from("images").getPublicUrl(`Vector4.png`).data.publicUrl} alt="vector 4" className='vector' />
                </div>
            </div>
            <Footer />
        </>
    )
}
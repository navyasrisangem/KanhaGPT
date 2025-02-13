import flute from '../assets/images/flute.png';
import musicnotes from '../assets/images/musicnotes.gif';

const Loading = () => {
    return (
        <div className='loading'>
            <img src={flute} alt='flute' />
            <img src={musicnotes} alt='musical notes' />
        </div>
    );
};

export default Loading;
import pfp from '../assets/images/pfp.png';
import Loading from './Loading';

const Chats = ({chatHistory, isLoading}) => {
    return (
        <div className='search-result'>
          {
            chatHistory.map((chatItem, _index) => (
                <div key={_index}>
                    <aside>
                        {chatItem.role === 'model' ? (
                            <div>
                                <img src={pfp} alt='pfp'/>
                            </div>
                        ) : (
                            <div>Y</div>
                        )}
                    </aside>
                    <pre
                        dangerouslySetInnerHTML={{
                            __html: (chatItem.parts?.[0]?.text || "") 
                            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                            .replace(/\*(.*?)\*/g, "<i>$1</i>"),
                        }}
                    />
                </div>
            ))}
            {isLoading && <Loading />}
        </div>
    );
    
};

export default Chats;
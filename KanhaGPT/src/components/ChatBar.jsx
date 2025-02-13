import logo from '/logo.png';

const ChatBar = ({value, setValue, getResponse,inputRef}) => {

   return (
      <div className='input-container'>
        <input
        ref={inputRef}
        value={value} 
        placeholder="How can I keep my mind calm amidst chaos?"
        onChange={(e)=> setValue(e.target.value)}
        onKeyDown={(e)=> e.key === "Enter" && getResponse() && setValue("")}
        />
        <button onClick={getResponse}>
            {"Ask Kanha"}
            <img src={logo} alt='logo' style={{marginLeft: "6px", height: "20px"}}/>
        </button>
      </div>
   );
};

export default ChatBar;
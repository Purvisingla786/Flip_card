import Image from "./emoji.jpg"

function Cards({onClick,flipped,text}) {
  return (
  <>
  
  <div
              onClick={onClick}
              className="w-24 h-32 border-2 border-black rounded-lg flip-card"
            >
              <div
                className={`relative w-full h-full rounded-lg transition-transform duration-700 flip-inner ${
                  !flipped  ? "flip" : ""
                }`}
              >
                <div
                  className={`bg-slate-200 flex items-center rounded-lg justify-center text-3xl faces absolute w-full h-full `}
                >
                  {text}
                </div>

                <div className={`absolute w-full h-full bg-white rounded-lg faces flip items-center flex`}>
                  <img src={Image} className="" alt="" />
                </div>
              </div>
            </div>
  </>
  )
}

export default Cards
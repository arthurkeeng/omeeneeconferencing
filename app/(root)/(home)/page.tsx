import MeetingTypeList from "@/components/MeetingTypeList";

export default function Home() {

  const now = new Date()
  const time = now.toLocaleTimeString('en-US' , 
    {
      hour : "2-digit" , minute : "2-digit"
    }
  )

  const date = (new Intl.DateTimeFormat('en-US', {
    dateStyle : "full" 
  }) ).format(now)
  
  return (
    <section className="flex flex-col gap-10 text-white size-full">
     <div className="rounded-[20px] h-[300px] w-full 
     bg-hero bg-cover
     ">
      <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
        <h2
        className=" font-normal glassmorphism max-w[270px] rounded py-2 text-base text-center"
        >Upcoming meeting at 12:30 PM</h2>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold lg:text-7xl">
            {time}
          </h1>
          <p className="text-lg lg:text-2xl text-sky-1 font-medium">{date}</p>
        </div>
      </div>
      </div> 
      <MeetingTypeList/>
    </section>
  );
}

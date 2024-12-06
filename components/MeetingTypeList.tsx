"use client";

import ItemCards from "./ItemCards";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "./ui/textarea";
import ReactDatePicker from 'react-datepicker'
import { Input } from "./ui/input";
type meetingState =
  | "isScheduleMeeting"
  | "isJoiningMeeting"
  | "isInstantMeeting"
  | undefined;

const MeetingTypeList = () => {
  const {toast} = useToast()
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<meetingState>();
  const [callDetails, setCallDetails] = useState<Call>();
  const [value, setValue] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const { user } = useUser();

  const client = useStreamVideoClient();
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if(!value.dateTime){
        toast({
          title: "Please selecta a data and time",
        })
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      
      if (!call) throw new Error("failed to create call");
      const startsAt =
        value.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = value.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if(!value.description) {
        router.push(`/meeting/${call.id}`)
      }
      toast({
        title: "Meeting Created",
      })
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create Meeting",
       
      })
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <ItemCards
        color="bg-orange-1"
        handleClick={() => setMeetingState("isInstantMeeting")}
        icon="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
      />
      <ItemCards
        color="bg-yellow-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        icon="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
      />
      <ItemCards
        color="bg-purple-1"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        icon="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
      />
      <ItemCards
        color="bg-blue-1"
        handleClick={() => {
          router.push("/recordings");
        }}
        icon="/icons/recordings.svg"
        title="View Recordings"
        description="See your recorded meetings"
      />
       {
        !callDetails ?     <MeetingModal
        // scheduled ={true}
        isOpen={meetingState === "isScheduleMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Create Meeting"
        handleClick={createMeeting}
      >
          <div className="flex flex-col gap-2.5">
          <label htmlFor="" className="text-base text-normal leading-[22px]
          text-sky-2
          ">Add a description
          </label>
            <Textarea 
            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={e => setValue({...value , description : e.target.value})}            
            />
        </div>
        <div className="flex w-full flex-col gap-2.5">
        <label htmlFor="" className="text-base text-normal leading-[22px]
          text-sky-2
          ">Select Date And Time
          </label>
          <ReactDatePicker selected={value.dateTime}
          onChange={(date) => setValue({...value , dateTime :date!})}
          showTimeSelect 
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d , YYYY h:mm aa"
          className="w-full rounded bg-dark-3 p-2 focus:outline-none"
          />
        </div>
      
      </MeetingModal>
      :    <MeetingModal
      isOpen={meetingState === "isScheduleMeeting"}
      onClose={() => setMeetingState(undefined)}
      title="Meeting Created"
      className="text-center"
      handleClick={() => {
        navigator.clipboard.writeText(meetingLink)
        toast({title : "Link Copied"})
      }}
  
      image="/icons/checked.svg"
      buttonIcon="/icons/copy.svg"
      buttonText = "Copy Meeting link"
      >
       
        
      
      </MeetingModal>
    }

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start An Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Paste Meeting Link"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={()=>router.push(value.link)}
      >
        <Input
        placeholder = "Meeting link here"
        className = "focus-visible:ring-offset-0 border-none bg-dark-3 focus-visible:ring-0"
        onChange= { e=> setValue({...value , link : e.target.value})}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;

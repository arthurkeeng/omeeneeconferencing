import CallList from "@/components/CallList"


const PreviousPage = () => {
  return (
    <section className="flex flex-col gap-10 text-white size-full">
    <h1 className="text-3xl font-bold">
      <CallList type="ended"/>
    </h1>
  </section>
  )
}

export default PreviousPage

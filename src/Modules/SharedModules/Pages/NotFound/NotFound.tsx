import photo from "../../../../assets/images/quizz/notfound.jpeg"
export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col">
      <img src={photo} alt="not-found" />
      <p className="text-gray-700 font-bold">oooops... No Page Found</p>
    </div>
  )
}

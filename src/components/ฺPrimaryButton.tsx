export default function PrimaryButton({title} : {title:string}) {
    return (
        <button
            type="submit"
            className="rounded-md px-4 py-2 mr-1 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500 cursor-pointer transition-all duration-300 hover:scale-105">
            {title}
          </button>
    )
}
import loading from '../theme/icons/loading.png'

const Loading = () => {
  return (
    <div className="grid justify-items-center h-full w-full absolute content-center">
      <img src={loading} alt='Sunny' className="animate-spin-slow h-28 w-28 lg:h-36 lg:w-36" />
      <div className="font-normal mt-6 text-2xl lg:text-3xl text-slate-400 antialiased">Fetching Location...</div>
    </div>
  )
}

export default Loading

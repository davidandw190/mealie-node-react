import appDownloadImage from '../assets/appDownload.png';
import landingImage from '../assets/landing.png';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-1g shadow-md py-8 flex flex-col gap-5 text-center">
        <h1 className="text-5x1 font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <span className='text-x1'>Food is just one click away!</span>
      </div>
      <div className='grid md:grid-cols-2 gap-5'>
        <img src={landingImage}/>
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          <span className='font-bold text-3x1 tracking-tighter'>
            Order takeaway even faster!
          </span>
          <span>
            Download the Mealie App for faster ordering and personalised recommendations
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
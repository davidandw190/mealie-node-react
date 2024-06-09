import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
}

const SearchResultsInfo = ({ total, city }: Props) => {
  return (
    <div className='text-x1 font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row' >
      <span>
        {total} Restaurants found in {city}
        <Link to='/' className='ml-2 text-sm fond-semibold underline cursor-pointer text-blue-500'> Change Location </Link>
      </span>

      TODO: INSERT SORTING OPTIONS HERE
    </div>
  )
}

export default SearchResultsInfo;
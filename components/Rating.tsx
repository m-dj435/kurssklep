interface RatingProps {
  rating: number;
}

const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="text-purple-800 text-center backdrop-contrast-200 font-bold border-dashed border-2 rounded-full border-indigo-600  hover:bg-gradient-to-r from-green-100 to-blue-500 hover:from-pink-100 hover:to-pink-300 hover:text-red-600 ring-2 ring-offset-2 ring-offset-blue-100 md:ring-offset-yellow-500">
      {rating}
    </div>
  );
};

export default Rating;

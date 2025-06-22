import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const LikeButton = ({movie , likedMovies , setLikedMovies}) => {

    const isLiked = likedMovies.some((m) => m.id === movie.id);

    const likeMovies = (e, movie) => {
        e.preventDefault();
        e.stopPropagation();
        setLikedMovies((prev) => {
            if (prev.some((m) => m.id === movie.id)) {
                return prev.filter((m) => m.id !== movie.id);
            } else {
                return [...prev, movie];
            }
        });
    };

  return (
    <button className='cursor-pointer absolute bottom-[10px] right-[20px] text-[18px]' onClick={(e) => likeMovies(e, movie)}>{isLiked ? <FaHeart /> : <FaRegHeart />}</button>
  )
}

export default LikeButton
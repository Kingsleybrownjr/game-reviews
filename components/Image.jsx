export const Image = ({ addtlClass, src, width, height }) => {
    return (
        <img className={`${addtlClass} object-cover rounded mb-2`}
             src={src} alt=""
             width={width}
             height={height}/>
    );
};

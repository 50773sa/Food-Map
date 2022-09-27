import foodLoader from '../assets/Images/food-loader.gif'

const LoadingSpinner = () => {
    return (
        <div className="loading-wrapper">
            <img src={foodLoader}>
        </img>                
    </div>
    )
}

export default LoadingSpinner
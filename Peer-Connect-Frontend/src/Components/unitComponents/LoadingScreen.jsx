import PropTypes from 'prop-types';

const LoadingScreen = ({
  message = 'Loading...',
  size = 'h-24 w-24',
  textColor = 'text-white',
  spinnerColor = 'border-primary',
}) => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div
            className={`${size} ${spinnerColor} animate-spin rounded-full border-b-4 border-t-4`}
          ></div>
          <div
            className={`${size} ${spinnerColor} absolute left-0 top-0 animate-ping rounded-full border-b-4 border-t-4 opacity-30`}
          ></div>
        </div>
        <div className={`animate-pulse text-2xl font-semibold ${textColor}`}>
          {message}
        </div>
        <div className="loading loading-dots loading-lg text-primary"></div>
      </div>
    </div>
  );
};

LoadingScreen.propTypes = {
  message: PropTypes.string,
  size: PropTypes.string,
  textColor: PropTypes.string,
  spinnerColor: PropTypes.string,
};

export default LoadingScreen;

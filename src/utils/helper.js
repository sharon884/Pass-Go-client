const getRemainingTimeInSeconds = (lockExpiresAt) => {
  const remainingTime = new Date(lockExpiresAt) - new Date();
  return Math.ceil(remainingTime / 1000);
};

export { getRemainingTimeInSeconds }; 

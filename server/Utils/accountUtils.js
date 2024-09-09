// Function to generate a random PIN
const generatePIN = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit PIN
  };
  
  // Function to generate a random account number
  const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Generates a 10-digit account number
  };
  
  module.exports = {
    generatePIN,
    generateAccountNumber
  };

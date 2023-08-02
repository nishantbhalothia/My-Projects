
$(document).ready(function () {
  $('#continueButton').click(function () {
      const identifier = $('#identifierInput').val();
      
      // Determine whether the input is an email or phone number
      if (isValidEmail(identifier)) {
          sendOTPByEmail(identifier);
      } else if (isValidPhoneNumber(identifier)) {
          sendOTPByPhoneNumber(identifier);
      } else {
          // Handle invalid input (neither email nor phone)
          console.error('Invalid input');
      }
  });
});

function isValidEmail(input) {
  const emailRegex = /\S+@\S+\.\S+/; // Matches any string that looks like an email address
  return emailRegex.test(input);
}

function isValidPhoneNumber(input) {
  const phoneNumberRegex = /^\d{10}$/; // Matches 10-digit phone numbers
  return phoneNumberRegex.test(input);
}

function sendOTPByEmail(email) {
  // Implement OTP sending logic for email here
  console.log('Sending OTP to email:', email);
  // Make an AJAX request to your server to send OTP to email
}

function sendOTPByPhoneNumber(phoneNumber) {
  // Implement OTP sending logic for phone number here
  console.log('Sending OTP to phone number:', phoneNumber);

  // Send an AJAX POST request to send OTP
  $.ajax({
      type: 'POST',
      url: '/users/send-otp',
      data: { phone: phoneNumber }, // Send the phone number
      success: function (response) {
          // Handle success (e.g., show a message to the user)
          console.log('OTP sent successfully:', response);
      },
      error: function (xhr, status, error) {
          // Handle error (e.g., show an error message)
          console.error('Error sending OTP:', error);
      }
  });
}



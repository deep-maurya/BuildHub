const otpTemplate = (otp) => {
  const html = `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">
        <div style="margin: 50px auto; width: 70%; padding: 20px 0;">
            <p style="font-size: 1.1em;">Hi,</p>
            <p>Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes.</p>
            <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${otp}</h2>
        </div>
    </div>`;
  const without_html = `Hi,\n\nUse the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes.\n\nOTP: ${otp}`;
  return { html, without_html };
};

const resetPassword = (name, link) => {
  const encodedToken = encodeURIComponent(link);
  const resetLink = `http://localhost:5173/forget_password/${encodedToken}`;
  console.log(resetLink)
  const html = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2 style="color: #333;">Hi ${name},</h2>
                <p style="color: #555;">
                    We received a request to reset your password. Click the button below to reset your password:
                </p>
                <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Reset Password
                </a>
                <p style="color: #555; margin-top: 20px;">
                    If you didn’t request this, please ignore this email. Your password won’t change until you access the link above and create a new one.
                </p>
            </div>
        `;
  const without_html = `
            Hi ${name},
            We received a request to reset your password. Use the link below to reset your password:
            ${resetLink}
            If you didn’t request this, please ignore this email. Your password won’t change until you access the link above and create a new one.
        `;

  return { html, without_html };
};


const instructorRegistration = (name, email, password, loginLink) => {
    const encodedLink = encodeURIComponent(loginLink);
    const loginUrl = `http://localhost:5173/login?redirect=${encodedLink}`;
  
    const html = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                  <h2 style="color: #333;">Hi ${name},</h2>
                  <p style="color: #555;">
                      Welcome! Your Instructor Account has been created successfully. Here are your login details:
                  </p>
                  <p style="color: #555;">
                      <strong>Email:</strong> ${email}<br>
                      <strong>Password:</strong> ${password}
                  </p>
                  <p style="color: #555;">
                      Click the button below to log in to your account:
                  </p>
                  <a href="${loginUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                      Log In
                  </a>
              </div>`;
  
    const without_html = `
              Hi ${name},
              Welcome! Your Instructor Account has been created successfully. Here are your login details:
              Email: ${email}
              Password: ${password}
  
              Click the link below to log in to your account:
              ${loginUrl}
          `;
  
    return { html, without_html };
  };

module.exports = { otpTemplate, resetPassword, instructorRegistration};

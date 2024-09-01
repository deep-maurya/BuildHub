const validator = require("validator");


const validate_login = (req, res, next) => {
    const { email, password } = req.body;
    let msg = "All required fields should be present: name, email, mobile, and image.";
    let status = 0;
    let data = [];
    if (!email || !validator.isEmail(email)) {
      msg = "Invalid or missing email. Please provide a valid email address.";
      return res.status(201).json({ status, message: msg, data });
    }
  
    const passwordRegex =/^[A-Za-z0-9\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      msg = "Password must be at least 8 characters long";
      return res.status(201).json({ status, message: msg, data });
    }
    req.userLoginData = { email, password };
    next();
};

const check_roles = ( roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.role)) {
            return res.status(403).json({ status: 0, message: "You're not authorized for this action" });
        } else {
            next();
        }
    };
};


const check_header = (header_specs) => {
    return (req, res, next) => {
        for (const [header, expectedValue] of Object.entries(header_specs)) {
            const headerValue = req.headers[header.toLowerCase()];
            if (headerValue === undefined) {
                return res.status(400).json({
                    status: 0,
                    message: `Missing required header: ${header}`
                });
            }
            if (header === 'authorization') {
                const [scheme, token] = headerValue.split(' ');
                if (scheme !== 'Bearer' || !token) {
                    return res.status(400).json({
                        status: 0,
                        message: 'Authorization header must be in Bearer token format.'
                    });
                }
            } else if (expectedValue && headerValue !== expectedValue) {
                return res.status(400).json({
                    status: 0,
                    message: `Header ${header} must be ${expectedValue}.`
                });
            }
        }
        next();
    };
};




module.exports = { check_header,check_roles,validate_login };


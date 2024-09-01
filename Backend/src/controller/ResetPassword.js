const { v4: uuidv4 } = require("uuid");
const { create_token, verify_token } = require("./JWT");
const ForgetPassword = require("../Models/Password_Reset");
const bcrypt = require("bcrypt");

const create_link_reset_password = async(user_id) => {
    const token = create_token({uid:user_id},'15m');
    const [token_header,token_payload,token_signature] = token.split(".");
    const identifier = uuidv4()
    const Reset_link = new ForgetPassword({
        userId:user_id,
        identifier:identifier,
        token:token_header+"."+token_payload,
        signature:token_signature
    })
    const reset_link = create_token({fprl:token_signature+"."+identifier},'15m');
    console.log(reset_link)
    try {
        const data = await Reset_link.save();
        console.log(data);
        return { status: 1, reset_link : reset_link};
    } catch (error) {
        console.log(error);
        return { status: 0, message: error.message };
    }
}

const verify_link_reset_password = async (reset_link) => {
    try {
      const decodedResult = await verify_token(reset_link);
      if (!decodedResult.status) {
        return { status: 0, message: "Invalid or expired reset link1" };
      }
  
      const { fprl } = decodedResult.decode;
      const [token_signature, identifier] = fprl.split(".");
      const resetRequest = await ForgetPassword.findOne({ identifier });
      if (!resetRequest) {
        return { status: 0, message: "Invalid or expired reset link2" };
      }

      const isMatch = await bcrypt.compare(token_signature, resetRequest.signature);
      if (!isMatch) {
        return { status: 0, message: "Invalid or expired reset link3" };
      }
  
      const prev_complete_token = resetRequest.token + "." + token_signature;
      const prev_token_verification = await verify_token(prev_complete_token);
      if (!prev_token_verification.status) {
        return { status: 0, message: "Invalid or expired reset link4" };
      }
  
      return { status: 1, reset_link: reset_link, uID:prev_token_verification.decode.uid};
  
    } catch (error) {
      console.log(error);
      return { status: 0, message: error.message };
    }
  };



module.exports = {
    create_link_reset_password,
    verify_link_reset_password
}
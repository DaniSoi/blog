const createConfirmHTML = (token, firstName, confirmUrl) => (
  `
<div>
Hello ${firstName},<br>
Thank you for your registration to Blog.<br>
Please verify your account:<br>
<a href="${confirmUrl}">Click to verify</a>
</div>
`
);

module.exports = createConfirmHTML;

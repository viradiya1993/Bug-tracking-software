module.exports = forgotpassword => {
  // return `
  //   <!DOCTYPE html>
  //   <html>
  //   <head>

  //     <meta charset="utf-8">
  //     <meta http-equiv="x-ua-compatible" content="ie=edge">
  //     <title>Password Reset</title>
  //     <meta name="viewport" content="width=device-width, initial-scale=1">
  //     <style type="text/css">
  //     /**
  //      * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
  //      */
  //     @media screen {
  //       @font-face {
  //         font-family: 'Source Sans Pro';
  //         font-style: normal;
  //         font-weight: 400;
  //         src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
  //       }
  //       @font-face {
  //         font-family: 'Source Sans Pro';
  //         font-style: normal;
  //         font-weight: 700;
  //         src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
  //       }
  //     }
  //     /**
  //      * Avoid browser level font resizing.
  //      * 1. Windows Mobile
  //      * 2. iOS / OSX
  //      */
  //     body,
  //     table,
  //     td,
  //     a {
  //       -ms-text-size-adjust: 100%; /* 1 */
  //       -webkit-text-size-adjust: 100%; /* 2 */
  //     }
  //     /**
  //      * Remove extra space added to tables and cells in Outlook.
  //      */
  //     table,
  //     td {
  //       mso-table-rspace: 0pt;
  //       mso-table-lspace: 0pt;
  //     }
  //     /**
  //      * Better fluid images in Internet Explorer.
  //      */
  //     img {
  //       -ms-interpolation-mode: bicubic;
  //     }
  //     /**
  //      * Remove blue links for iOS devices.
  //      */
  //     a[x-apple-data-detectors] {
  //       font-family: inherit !important;
  //       font-size: inherit !important;
  //       font-weight: inherit !important;
  //       line-height: inherit !important;
  //       color: inherit !important;
  //       text-decoration: none !important;
  //     }
  //     /**
  //      * Fix centering issues in Android 4.4.
  //      */
  //     div[style*="margin: 16px 0;"] {
  //       margin: 0 !important;
  //     }
  //     body {
  //       width: 100% !important;
  //       height: 100% !important;
  //       padding: 0 !important;
  //       margin: 0 !important;
  //     }
  //     /**
  //      * Collapse table borders to avoid space between cells.
  //      */
  //     table {
  //       border-collapse: collapse !important;
  //     }
  //     a {
  //       color: #1a82e2;
  //     }
  //     img {
  //       height: auto;
  //       line-height: 100%;
  //       text-decoration: none;
  //       border: 0;
  //       outline: none;
  //     }
  //     </style>

  //   </head>
  //   <body style="background-color: #e9ecef;">

  //     <!-- start preheader -->
  //     <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
  //       This is your reset password link, update it.
  //     </div>
  //     <!-- end preheader -->

  //     <!-- start body -->
  //     <table border="0" cellpadding="0" cellspacing="0" width="100%">

  //       <!-- start logo -->
  //       <tr>
  //         <td align="center" bgcolor="#e9ecef">
  //           <!--[if (gte mso 9)|(IE)]>
  //           <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  //           <tr>
  //           <td align="center" valign="top" width="600">
  //           <![endif]-->
  //           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  //             <tr>
  //               <td align="center" valign="top" >
  //                 <a href="<%=base_url%>" target="_blank" style="display: inline-block;">
  //                   <img src="${forgotpassword.logo}" alt="Logo" border="0" width="400" height:"150" style="display: block; width: 150px; max-width: 150px; min-width: 150px; height:150px">
  //                 </a>
  //               </td>
  //             </tr>
  //           </table>
  //           <!--[if (gte mso 9)|(IE)]>
  //           </td>
  //           </tr>
  //           </table>
  //           <![endif]-->
  //         </td>
  //       </tr>
  //       <!-- end logo -->

  //       <!-- start hero -->
  //       <tr>
  //         <td align="center" bgcolor="#e9ecef">
  //           <!--[if (gte mso 9)|(IE)]>
  //           <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  //           <tr>
  //           <td align="center" valign="top" width="600">
  //           <![endif]-->
  //           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  //             <tr>
  //               <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
  //                 <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Reset Your Password</h1>
  //               </td>
  //             </tr>
  //           </table>
  //           <!--[if (gte mso 9)|(IE)]>
  //           </td>
  //           </tr>
  //           </table>
  //           <![endif]-->
  //         </td>
  //       </tr>
  //       <!-- end hero -->

  //       <!-- start copy block -->
  //       <tr>
  //         <td align="center" bgcolor="#e9ecef">
  //           <!--[if (gte mso 9)|(IE)]>
  //           <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  //           <tr>
  //           <td align="center" valign="top" width="600">
  //           <![endif]-->
  //           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

  //             <!-- start copy -->
  //             <tr>
  //               <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
  //                 <p style="margin: 0;">Tap the button below to reset your account password. If you didn't request a new password, you can safely delete this email.</p>
  //               </td>
  //             </tr>
  //             <!-- end copy -->

  //             <!-- start button -->
  //             <tr>
  //               <td align="left">
  //                 <table border="0" cellpadding="0" cellspacing="0" width="100%">
  //                   <tr>
  //                     <td align="center" bgcolor="#FFFFFF" style="padding: 12px;">
  //                       <table border="0" cellpadding="0" cellspacing="0">
  //                         <tr>
  //                           <td align="center" style="border-radius: 6px;">
  //                             <a href="${forgotpassword.url}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #FFFFFF; text-decoration: none; border-radius: 6px;background: #1BB3F5;">Reset Password</a>
  //                           </td>
  //                         </tr>
  //                       </table>
  //                     </td>
  //                   </tr>
  //                 </table>
  //               </td>
  //             </tr>
  //             <!-- end button -->

  //             <!-- start copy -->
  //             <tr>
  //               <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
  //                 <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
  //                 <p style="margin: 0; word-break: break-all;"><a href="${forgotpassword.url}" target="_blank" style="word-break: break-all;">${forgotpassword.url}</a></p>
  //               </td>
  //             </tr>
  //             <!-- end copy -->

  //             <!-- start copy -->
  //             <tr>
  //               <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
  //                 <p style="margin: 0;">Warm Regards,<br> T2D2 Team </p>
  //               </td>
  //             </tr>
  //             <!-- end copy -->

  //           </table>
  //           <!--[if (gte mso 9)|(IE)]>
  //           </td>
  //           </tr>
  //           </table>
  //           <![endif]-->
  //         </td>
  //       </tr>
  //       <!-- end copy block -->
  //     </table>
  //     <!-- end body -->

  //   </body>
  //   </html>
  //   `;

  return `
<!DOCTYPE html>

<html>



<head>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;">

    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />

    <link rel="preconnect" href="https://fonts.gstatic.com">

    <title>Dannemiller</title>

    <style>

        body {

            font-family: 'calibri', sans-serif;

        }



        @media only screen and (max-width:599px) {}



        @media only screen and (max-width:480px) {}



        @media print {

            body {

                -webkit-print-color-adjust: exact;

            }

        }

    </style>

</head>



<body style="margin:0; padding:0;background: #F2F2F2">

    <table width="100%" border="0" cellpadding="0" cellspacing="0">

        <tbody>

            <tr>

                <td valign="top" align="center" style="margin:0; padding:0;">

                    <table align="center" border="0" cellpadding="0" cellspacing="0"

                        style="max-width: 750px;width: 100%;background-color:#fff">

                        <tbody>

                            <tr>

                                <td valign="top" align="center">

                                    <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"

                                        style="background-color: #09378A; padding: 35px 20px;">

                                        <tbody>

                                            <tr>

                                                <td valign="top" width="100%">

                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">

                                                        <tbody>

                                                            <tr>



                                                                <td valign="top" align="left" class="pd0"

                                                                    style="padding-left:20px; padding-right:20px; width: 100%; text-align: center;">

                                                                    <a href="#" target="_blank" title="ManekTech"

                                                                        class="resp_logo"

                                                                        style="width:230px; display: inline-block;">

                                                                        <img src="logo.png" alt="ManekTech"

                                                                            style="border:none; max-width:100%;" />

                                                                    </a>

                                                                </td>



                                                            </tr>

                                                        </tbody>

                                                    </table><!-- End of Header Content Tabel-->

                                                </td>

                                            </tr>

                                        </tbody>

                                    </table><!-- End of header block-->

                                </td>

                            </tr>

                            <tr>

                                <td valign="top" align="center">

                                    <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"

                                        style="background-color: #fff; padding: 50px 50px 50px;">

                                        <tbody>

                                            <tr>

                                                <td valign="top" width="100%">

                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">

                                                        <tbody>

                                                            <tr>

                                                                <td valign="top" width="100%" align="left"

                                                                    style="margin:0; padding:0; font-size:16px; line-height:24px; font-weight:300; color: #232020;">

                                                                    <h2 style="font-weight: 700;margin:0 0 15px 0;">

                                                                        Reset Password

                                                                    </h2>

                                                                </td>

                                                            </tr>

                                                            <tr>

                                                                <td valign="top" width="100%" align="left"

                                                                    style="margin:0; padding:0; font-size:16px; line-height:24px; font-weight:300; color: #232020;">

                                                                    <p

                                                                        style="font-weight: 400; margin:0;line-height:24px;">

                                                                        You're receiving this e-mail because you

                                                                        requested a password reset for your Bug Tracking Account.

                                                                    </p>

                                                                    <p

                                                                        style="font-weight: 400; margin:0 0 10px 0;line-height:24px;">

                                                                        Please tap the button below to choose a new

                                                                        password.

                                                                    </p>

                                                                    <a href="${forgotpassword.url}"

                                                                        style="background: #0FADA2;padding: 8px 25px;display: inline-block;margin-top: 8px;text-decoration: none;font-weight: 500;color: #fff;font-size: 16px;border: 1px solid #fff;">

                                                                        Reset Password

                                                                    </a>

                                                                </td>

                                                            </tr>

                                                        </tbody>

                                                    </table><!-- End of Header Content Tabel-->

                                                </td>

                                            </tr>

                                        </tbody>

                                    </table><!-- End of header block-->

                                </td>

                            </tr>

                            <tr>

                                <td valign="top" align="center">

                                    <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"

                                        style="background-color: #eaeaea; padding: 25px 20px;">

                                        <tbody>

                                            <tr>

                                                <td valign="top" width="100%">

                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">

                                                        <tbody>

                                                            <tr>



                                                                <td valign="top" align="left" class="pd0"

                                                                    style="padding-left:20px; padding-right:20px; width: 100%; text-align: center;">

                                                                    <div style="color: #333;">

                                                                    <strong

                                                                    style="margin-bottom: 20px;font-size: 20px;line-height: 30px;color: #09378A;">ManekTech Pvt. Ltd.</strong> <br />

                                                                    <p

                                                                        style="font-weight: 400; margin:5px 0 0 0;font-size:16px;line-height:24px;">

                                                                        4th Floor, Timber Point, Beside Kotak Mahindra Bank, Near Prahaladnagar Garden, Prahaladnagar Road, Ahmedabad, Gujarat 380015

                                                                    </p>

                                                                    </div>

                                                                </td>

                                                            </tr>

                                                            <tr>

                                                                <td valign="top" align="left" class="pd0"

                                                                    style="padding-left:20px; padding-right:20px; width: 100%; text-align: center;">

                                                                    <a href="tel:8511428441" style="color: #333;text-decoration: none;font-size: 16px;

                                                                    line-height: 24px;"><strong>Phone:</strong>
                                                                    +91-851-142-8441</a>

                                                                </td>

                                                            </tr>

                                                        </tbody>

                                                    </table><!-- End of Header Content Tabel-->

                                                </td>

                                            </tr>

                                        </tbody>

                                    </table><!-- End of header block-->

                                </td>

                            </tr>

                            <tr>

                                <td valign="top" align="center">

                                    <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"

                                        style="background-color: #fff; padding: 25px 20px;">

                                        <tbody>

                                            <tr>

                                                <td valign="top" width="100%">

                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">

                                                        <tbody>

                                                            <tr>

                                                                <td valign="top" align="left" class="pd0"

                                                                    style="padding-left:20px; padding-right:20px; width: 100%; text-align: center;">

                                                                    <p

                                                                        style="font-weight: 400; margin:0 0 15px 0; font-size: 18px; color: #333;">

                                                                        <strong>Follow Us</strong>

                                                                    </p>

                                                                    <div>
                                                                    <a href="https://www.facebook.com/ManekTech-191482567545069"

                                                                        target="_blank" title="facebook"

                                                                        style="text-decoration: none;margin: 0 3px;">
                                                                      
                                                                        <img src="backend/public/logo/facebook.png" alt="facebook"

                                                                            style="width: 30px;">

                                                                    </a>

                                                                    <a href="https://twitter.com/manektech"

                                                                        target="_blank" title="twitter"

                                                                        style="text-decoration: none;margin: 0 3px;">

                                                                        <img src="twitter.png" alt="twitter"

                                                                            style="width: 30px;">

                                                                    </a>

                                                                    <a href="https://www.linkedin.com/company/manektech"

                                                                        target="_blank" title="linkedin"

                                                                        style="text-decoration: none;margin: 0 3px;">

                                                                        <img src="linkedin.png" alt="linkedin"

                                                                            style="width: 30px;">

                                                                    </a>

                                                                    </div>

                                                                    <p

                                                                    style="font-weight: 400; margin:13px 0 0;font-size:13px;line-height:24px;color: #bdbdbd;">

                                                                    © 2021 ManekTech - All Rights Reserved

                                                                    </p>

                                                                </td>

                                                            </tr>

                                                        </tbody>

                                                    </table><!-- End of Header Content Tabel-->

                                                </td>

                                            </tr>

                                        </tbody>

                                    </table><!-- End of header block-->

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </td>

            </tr>

            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end logo -->
    
        <!-- start hero -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Reset Your Password</h1>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end hero -->
    
        <!-- start copy block -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">Tap the button below to reset your account password. If you didn't request a new password, you can safely delete this email.</p>
                </td>
              </tr>
              <!-- end copy -->
    
              <!-- start button -->
              <tr>
                <td align="left">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" bgcolor="#FFFFFF" style="padding: 12px;">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="border-radius: 6px;">
                              <a href="${forgotpassword.url}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #FFFFFF; text-decoration: none; border-radius: 6px;background: #1BB3F5;">Reset Password</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- end button -->
    
              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                  <p style="margin: 0; word-break: break-all;"><a href="${forgotpassword.url}" target="_blank" style="word-break: break-all;">${forgotpassword.url}</a></p>
                </td>
              </tr>
              <!-- end copy -->
    
              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                  <p style="margin: 0;">Warm Regards,<br> Bug Tracking Team </p>
                </td>
              </tr>
              <!-- end copy -->
    
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end copy block -->
      </table>
      <!-- end body -->
    
    </body>
    </html>
    `;
  }
        
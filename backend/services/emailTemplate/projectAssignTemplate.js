module.exports = projectAssign => {
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

                                                                        <img src="${projectAssign.logo}" alt="Bug Tracking Software"

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

                                                                    <h2 style="font-weight: 700;margin:0 0 20px 0;">

                                                                        Welcome to Bug Tracking Software!

                                                                    </h2>

                                                                </td>

                                                            </tr>

                                                            <tr>

                                                                <td valign="top" width="100%" align="left"

                                                                    style="margin:0; padding:0; font-size:16px; line-height:24px; font-weight:300; color: #232020;">

                                                                    <p

                                                                        style="font-weight: 400; margin:0;line-height:24px;">
                                                                       
                                                                        You have assigned a new project to the developer.
                                                                        The developer's name is mentioned below.
                                                                        

                                                                    </p>

                                                                    <p

                                                                        style="font-weight: 400; margin:5px 0 0px 0;line-height:24px;">

                                                                        <strong>Project Name:</strong> ${projectAssign.projectName}

                                                                    </p>

                                                                    <p

                                                                        style="font-weight: 400; margin:0;line-height:24px;">

                                                                        <strong>Developer Name:</strong> ${projectAssign.developer}

                                                                    </p>

                                                                </td>

                                                            </tr>

                                                            <tr>

                                                                <td valign="top" width="100%" align="left"

                                                                    style="margin:0; padding:0; font-size:16px; line-height:24px; font-weight:300; color: #232020;">

                                                                    <p

                                                                        style="font-weight: 400; margin:30px 0 0 0;line-height:24px;">

                                                                        Thank you for using Bug Tracking Software!

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

                                                                            <img src="facebook.png" alt="facebook"

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

        </tbody>

    </table>

</body>



</html>`;
}
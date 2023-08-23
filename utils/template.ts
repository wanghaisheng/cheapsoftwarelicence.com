export const generateTemplate = (
  BASE_URI: string,
  code: string,
  email: string
) => {
  return ` <!doctype html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <title> Your code is [${code}] </title>
     
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        #outlook a {
          padding: 0;
        }
    
        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
    
        table,
        td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
    
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
    
        p {
          display: block;
          margin: 13px 0;
        }
      </style>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap);
      </style>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:480px) {
          .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
          }
        }
      </style>
      <style type="text/css">
        @media only screen and (max-width:480px) {
          table.mj-full-width-mobile {
            width: 100% !important;
          }
    
          td.mj-full-width-mobile {
            width: auto !important;
          }
        }
      </style>
      <style type="text/css">
        a,
        span,
        td,
        th {
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        }
      </style>
    </head>
    
    <body style="background-color:#f3f3f5;">
       
      <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"> 
        <img style="width: 100px; height: auto;" src="https://cheapsoftwarelicence.com/trend-dad.png" alt="trend dad" />
        <span>Your code is [${code}]</span> </div>
      <div style="background-color:#f3f3f5;">
       
        <div style="margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                  
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                      <tr>
                        <td style="font-size:0px;word-break:break-word;">
                        
                          <div style="height:20px;"> &nbsp; </div>
                          
                        </td>
                      </tr>
                    </table>
                  </div>
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style="background:#000000 url(https://www.transparenttextures.com/patterns/brushed-alum.png) top center / auto repeat;margin:0px auto;border-radius:4px 4px 0 0;max-width:600px;">
          <div style="line-height:0;font-size:0;">
            <table align="center" background="https://www.transparenttextures.com/patterns/brushed-alum.png" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000 url(https://www.transparenttextures.com/patterns/brushed-alum.png) top center / auto repeat;width:100%;border-radius:4px 4px 0 0;">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                   
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
       
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:0 0 4px 4px;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:0 0 4px 4px;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 10px;text-align:center;">
                
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:20px;font-weight:300;line-height:30px;text-align:left;color:#003366;">
                            <img style="width: 100px; height: auto;" src="https://cheapsoftwarelicence.com/trend-dad.png" alt="trend dad" />
                            <h1 style="margin: 0; font-size: 32px; line-height: 50px; font-weight: 400;"> Your code is [${code}]</h1>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:20px;font-weight:300;line-height:30px;text-align:left;color:#030304;">Please click the button below to <a href="${BASE_URI}/confirm-email?email=${email}&code=${code}" style="color: #000000;">Confirm your email</a>. Once you have completed the process, you can start using our service.</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                            <tr>
                              <td align="center" bgcolor="#043768" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#043768;" valign="middle">
                                <a href="${BASE_URI}/confirm-email?email=${email}&code=${code}" style="display: inline-block; background: #000000; color: white; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: normal; line-height: 30px; margin: 0; text-decoration: none; text-transform: none; padding: 10px 25px; mso-padding-alt: 0px; border-radius: 3px;" target="_blank"> Confirm your email </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </div>
               
                </td>
              </tr>
            </tbody>
          </table>
        </div>
       
        <div style="background:#d5d5d5;background-color:#d5d5d5;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#d5d5d5;background-color:#d5d5d5;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
       
        <div style="background:#043768;background-color:#000000;margin:0px auto;max-width:600px;">
          
          
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
         
        <div style="margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                  
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                      <tr>
                        <td style="font-size:0px;word-break:break-word;">
                        
                          <div style="height:1px;"> &nbsp; </div>
                          
                        </td>
                      </tr>
                    </table>
                  </div>
                 
                </td>
              </tr>
            </tbody>
          </table>
        </div>
       
      </div>
    </body>
    
    </html>`;
};

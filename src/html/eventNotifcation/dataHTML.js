const dataHTML = (doc) => {
  const { title, start, end, process, type, creado } = doc;

  const final =
    new Date(start).toISOString() !== new Date(end).toISOString()
      ? new Date(end).toISOString().slice(0, 10) +
        ' Hora: ' +
        new Date(end).toISOString().slice(11, 16)
      : '';

  return `<tr style="border-collapse: collapse">
      <td
        align="left"
        style="padding: 0; margin: 0; padding-right: 20px"
      >
        <!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:184px" valign="top"><![endif]-->
        <table
          class="es-left"
          cellspacing="0"
          cellpadding="0"
          align="left"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            float: left;
          "
        >
          <tr style="border-collapse: collapse">
            <td
              class="es-m-p0r es-m-p20b"
              valign="top"
              align="center"
              style="padding: 0; margin: 0; width: 184px"
            >
              <table
                width="100%"
                cellspacing="0"
                cellpadding="0"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                "
              >
                <tr style="border-collapse: collapse">
                  <td
                    class="es-m-txt-c"
                    bgcolor="#efefef"
                    align="right"
                    style="
                      padding: 0;
                      margin: 0;
                      padding-top: 5px;
                      padding-bottom: 5px;
                      padding-right: 5px;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        -webkit-text-size-adjust: none;
                        -ms-text-size-adjust: none;
                        mso-line-height-rule: exactly;
                        font-family: arial, 'helvetica neue',
                          helvetica, sans-serif;
                        line-height: 21px;
                        color: #333333;
                        font-size: 14px;
                      "
                    >
                    Creado: ${new Date(creado).toISOString().slice(0, 10)}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!--[if mso]></td><td style="width:20px"></td><td style="width:376px" valign="top"><![endif]-->
        <table
          cellspacing="0"
          cellpadding="0"
          align="right"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
          "
        >
          <tr style="border-collapse: collapse">
            <td
              align="left"
              style="padding: 0; margin: 0; width: 376px"
            >
              <table
                width="100%"
                cellspacing="0"
                cellpadding="0"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                "
              >
                <tr style="border-collapse: collapse">
                  <td
                    class="es-m-txt-c"
                    align="left"
                    style="
                      padding: 0;
                      margin: 0;
                      padding-bottom: 5px;
                      padding-left: 20px;
                    "
                  >
                    <h4
                      style="
                        margin: 0;
                        line-height: 120%;
                        mso-line-height-rule: exactly;
                        font-family: tahoma, verdana, segoe,
                          sans-serif;
                        color: #333333;
                      "
                    >
                   
                    </h4>
                  </td>
                </tr>
                <tr style="border-collapse: collapse">
                  <td
                    class="es-m-txt-c"
                    align="left"
                    style="
                      padding: 0;
                      margin: 0;
                      padding-left: 20px;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        -webkit-text-size-adjust: none;
                        -ms-text-size-adjust: none;
                        mso-line-height-rule: exactly;
                        font-family: arial, 'helvetica neue',
                          helvetica, sans-serif;
                        line-height: 21px;
                        color: #333333;
                        font-size: 14px;
                      "
                    >
                     Evento: ${title} 
                    </p>

                    <p
                    style="
                    margin-top: 5;
                      -webkit-text-size-adjust: none;
                      -ms-text-size-adjust: none;
                      mso-line-height-rule: exactly;
                      font-family: arial, 'helvetica neue',
                        helvetica, sans-serif;
                      line-height: 21px;
                      color: #333333;
                      font-size: 14px;
                    "
                  >
                   Fecha Inicio: ${
                     new Date(start).toISOString().slice(0, 10) +
                     ' Hora: ' +
                     new Date(start).toISOString().slice(11, 16)
                   } 
                  </p>

                  
                    ${
                      final &&
                      `<p
                  style="
                  margin-top: 5;
                    -webkit-text-size-adjust: none;
                    -ms-text-size-adjust: none;
                    mso-line-height-rule: exactly;
                    font-family: arial, 'helvetica neue',
                      helvetica, sans-serif;
                    line-height: 21px;
                    color: #333333;
                    font-size: 14px;
                  "
                >
                 Fecha Final: ${
                   new Date(end).toISOString().slice(0, 10) +
                   ' Hora: ' +
                   new Date(end).toISOString().slice(11, 16)
                 } 
                </p>`
                    }
              
                ${
                  process &&
                  `<p
                  style="
                  margin-top: 5;
                    -webkit-text-size-adjust: none;
                    -ms-text-size-adjust: none;
                    mso-line-height-rule: exactly;
                    font-family: arial, 'helvetica neue',
                      helvetica, sans-serif;
                    line-height: 21px;
                    color: #333333;
                    font-size: 14px;
                  "
                >
                 Proceso Enlazado: ${process} 
                </p>`
                }

              
                 <p
                     style="
                  margin-top: 5;
                  -webkit-text-size-adjust: none;
                  -ms-text-size-adjust: none;
                  mso-line-height-rule: exactly;
                  font-family: arial, 'helvetica neue',
                    helvetica, sans-serif;
                  line-height: 21px;
                  color: #333333;
                  font-size: 14px;
                "
                   >
                     Tipo Evento: ${type}
                   </p>
              
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
      </tr>`;
};

module.exports = {
  dataHTML
};
